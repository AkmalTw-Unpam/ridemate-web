import { useEffect } from 'react'
import { ROUTES, RUTE, useRoute } from './router/useRoute'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { Rewards } from './pages/Rewards'
import { Community } from './pages/Community'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

/**
 * Judul dan deskripsi per halaman — dibaca dari router/rute.json.
 *
 * SATU DAFTAR, TIGA PEMAKAI
 *
 * Berkas rute.json yang sama dipakai tiga tempat: komponen ini untuk judul
 * tab, scripts/prarender.mjs untuk menulis berkas HTML tiap halaman, dan
 * skrip yang sama untuk membangkitkan sitemap.xml.
 *
 * Dulu daftarnya ditulis ulang di sini. Selama hanya judul tab yang
 * bergantung padanya, itu tidak berbahaya. Begitu sitemap dan prarender ikut
 * membacanya, tiga salinan berarti menambah halaman baru harus diingat di
 * tiga tempat — dan yang terlupa biasanya sitemap, yang kesalahannya tidak
 * terlihat sampai berbulan-bulan kemudian waktu halaman itu tidak pernah
 * muncul di Google.
 */

function halaman(path: string) {
  switch (path) {
    case ROUTES.features: return <Features />
    case ROUTES.rewards: return <Rewards />
    case ROUTES.community: return <Community />
    case ROUTES.about: return <About />
    case ROUTES.contact: return <Contact />
    case ROUTES.home: return <Home />
    // Jalur tak dikenal menampilkan beranda, bukan layar 404.
    // Untuk situs enam halaman, satu-satunya cara sampai ke jalur asing
    // adalah salah ketik hash — dan beranda lebih berguna daripada halaman
    // buntu yang menyuruh orang kembali.
    default: return <Home />
  }
}

export default function App() {
  const path = useRoute()

  useEffect(() => {
    const m = RUTE.find((r) => r.jalur === path) ?? RUTE[0]
    document.title = m.judul
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.deskripsi)
    // Canonical ikut diperbarui. Tanpa ini, keenam halaman menunjuk
    // canonical yang sama dan Google diminta menganggap kelimanya salinan
    // beranda — persis masalah yang baru saja dibereskan.
    document
      .querySelector('link[rel="canonical"]')
      ?.setAttribute('href', `https://ridemate.my.id${path === ROUTES.home ? '/' : path}`)
  }, [path])

  return (
    <>
      <a className="skip-link" href="#isi">Lompat ke isi</a>
      <Navbar aktif={path} />
      <main id="isi">{halaman(path)}</main>
      <Footer />
    </>
  )
}
