import { ROUTES } from '../router/useRoute'
import { Lambang } from './Icons'
import { config, apiSiap } from '../services/config'

export function Footer() {
  const tahun = new Date().getFullYear()

  // Tautan sosial yang belum diisi tidak ditampilkan sama sekali.
  // Ikon media sosial yang mengarah ke "#" terbaca sebagai situs yang belum
  // selesai dikerjakan, dan itu lebih merugikan daripada tidak ada ikonnya.
  const sosial = [
    { label: 'Instagram', url: config.instagramUrl },
    { label: 'YouTube', url: config.youtubeUrl },
  ].filter((s) => s.url !== '')

  return (
    <footer className="kaki">
      <div className="wrap">
        <div className="kaki__atas">
          <div className="kaki__merek">
            <a href={`#${ROUTES.home}`} className="nav__merek" style={{ marginBottom: 12 }}>
              <Lambang size={34} />
              <span>RideMate</span>
            </a>
            <p>
              Aplikasi Android untuk peturing motor. Navigasi khusus roda dua,
              catatan jarak tempuh, rombongan, dan lencana pencapaian.
            </p>
          </div>

          <nav className="kaki__kolom" aria-label="Halaman">
            <h4>Halaman</h4>
            <a href={`#${ROUTES.features}`}>Fitur</a>
            <a href={`#${ROUTES.rewards}`}>Lencana</a>
            <a href={`#${ROUTES.community}`}>Komunitas</a>
            <a href={`#${ROUTES.about}`}>Tentang</a>
            <a href={`#${ROUTES.contact}`}>Kontak &amp; FAQ</a>
          </nav>

          <div className="kaki__kolom">
            <h4>Hubungi</h4>
            {config.contactEmail ? (
              <a href={`mailto:${config.contactEmail}`}>{config.contactEmail}</a>
            ) : (
              <span className="kaki__redup">Email belum dikonfigurasi</span>
            )}
            {sosial.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
            {sosial.length === 0 && (
              <span className="kaki__redup">Media sosial belum dikonfigurasi</span>
            )}
          </div>
        </div>

        <div className="kaki__bawah">
          <p>© {tahun} RideMate. Dibuat untuk yang jalannya lebih panjang dari tujuannya.</p>
          {!apiSiap && (
            <p className="kaki__redup">
              Situs ini berjalan dengan data contoh. Angka dan nama yang tampil bukan data pengguna.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
