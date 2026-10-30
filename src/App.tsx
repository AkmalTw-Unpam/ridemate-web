import { useEffect } from 'react'
import { ROUTES, useRoute } from './router/useRoute'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { Features } from './pages/Features'
import { Rewards } from './pages/Rewards'
import { Community } from './pages/Community'
import { About } from './pages/About'
import { Contact } from './pages/Contact'

/**
 * Judul dan deskripsi per halaman.
 *
 * Diperbarui lewat efek, bukan lewat pustaka seperti react-helmet. Situs ini
 * satu bundel tanpa render di server, jadi perayap yang tidak menjalankan
 * JavaScript tetap hanya melihat judul di index.html — pustaka apa pun tidak
 * mengubah kenyataan itu. Yang berubah di sini judul tab dan judul yang
 * tersimpan saat halaman di-bookmark, dan untuk itu empat baris sudah cukup.
 *
 * Kalau SEO per halaman nanti jadi penting, jawabannya bukan pustaka meta
 * melainkan pra-render — lihat README bagian "Catatan SEO".
 */
const META: Record<string, { judul: string; isi: string }> = {
  [ROUTES.home]: {
    judul: 'RideMate — Perjalananmu, Ceritamu',
    isi: 'Aplikasi Android untuk peturing motor: navigasi roda dua, rombongan di satu peta, dan lencana pencapaian.',
  },
  [ROUTES.features]: {
    judul: 'Fitur — RideMate',
    isi: 'Navigasi khusus motor, rute alternatif, rombongan di satu peta, avatar kendaraan, dan catatan jarak tempuh.',
  },
  [ROUTES.rewards]: {
    judul: 'Lencana & Pencapaian — RideMate',
    isi: 'Tiga belas lencana dari perunggu sampai platina, dihitung dari jarak yang benar-benar kamu tempuh.',
  },
  [ROUTES.community]: {
    judul: 'Komunitas — RideMate',
    isi: 'Buat rencana touring, kumpulkan rombongan, berangkat bersama, lalu saling menilai.',
  },
  [ROUTES.about]: {
    judul: 'Tentang — RideMate',
    isi: 'Kenapa RideMate dibuat, dan tiga hal yang tidak ditawar: jujur, privasi, dan komunitas yang bisa direm.',
  },
  [ROUTES.contact]: {
    judul: 'Kontak & FAQ — RideMate',
    isi: 'Pertanyaan yang sering masuk tentang RideMate, dan cara menghubungi kami.',
  },
}

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
    const m = META[path] ?? META[ROUTES.home]
    document.title = m.judul
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.isi)
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
