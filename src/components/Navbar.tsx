import { useEffect, useState } from 'react'
import { ROUTES } from '../router/useRoute'
import { Lambang, IkonMenu, IkonTutup } from './Icons'
import { TombolUnduh } from './Ui'

const MENU = [
  { ke: ROUTES.home, label: 'Beranda' },
  { ke: ROUTES.features, label: 'Fitur' },
  { ke: ROUTES.rewards, label: 'Lencana' },
  { ke: ROUTES.community, label: 'Komunitas' },
  { ke: ROUTES.about, label: 'Tentang' },
  { ke: ROUTES.contact, label: 'Kontak' },
]

export function Navbar({ aktif }: { aktif: string }) {
  const [buka, setBuka] = useState(false)
  const [turun, setTurun] = useState(false)

  // Latar bilah berubah begitu halaman digulir. Di puncak halaman, bilah
  // transparan membiarkan foto hero terlihat penuh; begitu isi halaman lewat
  // di belakangnya, bilah butuh latar sendiri supaya tulisannya tetap
  // terbaca di atas apa pun yang kebetulan ada di bawahnya.
  useEffect(() => {
    const onScroll = () => setTurun(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu ponsel tertutup sendiri setiap pindah halaman. Tanpa ini, menu tetap
  // menutupi halaman yang baru dibuka dan terbaca seperti tautannya tidak
  // berfungsi.
  useEffect(() => setBuka(false), [aktif])

  // Mengunci gulir latar selama menu terbuka, supaya halaman di belakangnya
  // tidak ikut bergerak saat jari menggeser menu.
  useEffect(() => {
    document.body.style.overflow = buka ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [buka])

  return (
    <header className={`nav${turun ? ' nav--turun' : ''}`}>
      <div className="wrap nav__isi">
        <a href={`#${ROUTES.home}`} className="nav__merek" aria-label="RideMate, ke beranda">
          <Lambang size={36} />
          <span>RideMate</span>
        </a>

        <nav className="nav__tautan" aria-label="Menu utama">
          {MENU.map((m) => (
            <a
              key={m.ke}
              href={`#${m.ke}`}
              className={aktif === m.ke ? 'is-aktif' : undefined}
              aria-current={aktif === m.ke ? 'page' : undefined}
            >
              {m.label}
            </a>
          ))}
        </nav>

        <div className="nav__aksi">
          <TombolUnduh gaya="primary" />
        </div>

        <button
          type="button"
          className="nav__tombol"
          onClick={() => setBuka((v) => !v)}
          aria-expanded={buka}
          aria-controls="menu-ponsel"
          aria-label={buka ? 'Tutup menu' : 'Buka menu'}
        >
          {buka ? <IkonTutup /> : <IkonMenu />}
        </button>
      </div>

      {buka && (
        <div className="nav__panel" id="menu-ponsel">
          <nav aria-label="Menu ponsel">
            {MENU.map((m) => (
              <a
                key={m.ke}
                href={`#${m.ke}`}
                className={aktif === m.ke ? 'is-aktif' : undefined}
                aria-current={aktif === m.ke ? 'page' : undefined}
              >
                {m.label}
              </a>
            ))}
          </nav>
          <div style={{ marginTop: 18 }}>
            <TombolUnduh gaya="primary" />
          </div>
        </div>
      )}
    </header>
  )
}
