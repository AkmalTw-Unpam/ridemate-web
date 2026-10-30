import type { ReactNode } from 'react'
import { IkonInfo } from './Icons'
import { playStoreSiap, config } from '../services/config'
import { IkonUnduh } from './Icons'

/** Pembungkus satu bagian halaman, lengkap dengan lebar maksimumnya. */
export function Bagian({
  children,
  nada = 'terang',
  rapat = false,
  id,
}: {
  children: ReactNode
  nada?: 'terang' | 'dalam' | 'gelap' | 'malam'
  rapat?: boolean
  id?: string
}) {
  const kelasNada =
    nada === 'gelap' ? ' section--dark'
    : nada === 'malam' ? ' section--night'
    : nada === 'dalam' ? ' section--deep'
    : ''
  return (
    <section id={id} className={`section${rapat ? ' section--tight' : ''}${kelasNada}`}>
      <div className="wrap">{children}</div>
    </section>
  )
}

export function JudulBagian({
  atas,
  judul,
  lede,
  tengah = false,
}: {
  atas?: string
  judul: string
  lede?: string
  tengah?: boolean
}) {
  return (
    <header className={`stack${tengah ? ' center' : ''}`} style={{ gap: 10, marginBottom: 34 }}>
      {atas && <p className="eyebrow">{atas}</p>}
      <h2>{judul}</h2>
      {lede && <p className="lede" style={tengah ? { marginInline: 'auto' } : undefined}>{lede}</p>}
    </header>
  )
}

export function Kartu({
  judul,
  isi,
  ikon,
  gelap = false,
}: {
  judul: string
  isi: string
  ikon?: ReactNode
  gelap?: boolean
}) {
  return (
    <article className={`card card--hover${gelap ? ' card--dark' : ''}`}>
      {ikon && <div className="card__icon">{ikon}</div>}
      <h3>{judul}</h3>
      <p>{isi}</p>
    </article>
  )
}

/**
 * Label yang menyatakan isi di dekatnya adalah contoh.
 *
 * Dipasang di SETIAP bagian yang menampilkan data karangan. Satu label di
 * kaki halaman tidak cukup — yang membaca kartu touring di tengah halaman
 * sering tidak pernah sampai ke bawah.
 */
export function CatatanDemo({ anak }: { anak: string }) {
  return (
    <div className="demo-note" role="note">
      <IkonInfo size={18} />
      <span>{anak}</span>
    </div>
  )
}

/**
 * Tombol unduh.
 *
 * Selama VITE_PLAY_STORE_URL kosong, ia BUKAN tautan — ia tombol mati
 * bertuliskan "Segera hadir". Tautan unduh palsu adalah cara tercepat
 * kehilangan orang yang benar-benar ingin memasang aplikasinya: mereka
 * menekannya, mendarat di halaman kosong, lalu tidak pernah kembali.
 */
export function TombolUnduh({ gaya = 'primary' }: { gaya?: 'primary' | 'ghost' }) {
  if (!playStoreSiap) {
    return (
      <span className={`btn btn--${gaya}`} aria-disabled="true" title="Aplikasinya belum terbit di Play Store">
        <IkonUnduh size={19} />
        Segera hadir di Play Store
      </span>
    )
  }
  return (
    <a className={`btn btn--${gaya}`} href={config.playStoreUrl} target="_blank" rel="noopener noreferrer">
      <IkonUnduh size={19} />
      Unduh di Google Play
    </a>
  )
}

/** Keadaan sedang memuat. */
export function SedangMemuat({ pesan = 'Memuat…' }: { pesan?: string }) {
  return (
    <div className="card center" role="status" aria-live="polite" style={{ padding: 40 }}>
      <p style={{ color: 'var(--ink-muted)' }}>{pesan}</p>
    </div>
  )
}

/** Keadaan gagal. Selalu menyertakan cara mencoba lagi. */
export function Gagal({ pesan, onUlang }: { pesan: string; onUlang?: () => void }) {
  return (
    <div className="card center" role="alert" style={{ padding: 34 }}>
      <h3 style={{ marginBottom: 8 }}>Gagal memuat</h3>
      <p style={{ color: 'var(--ink-muted)', marginBottom: onUlang ? 16 : 0 }}>{pesan}</p>
      {onUlang && (
        <button className="btn btn--line" onClick={onUlang} type="button">
          Coba lagi
        </button>
      )}
    </div>
  )
}

/** Keadaan kosong. */
export function Kosong({ judul, isi }: { judul: string; isi: string }) {
  return (
    <div className="card center" style={{ padding: 34 }}>
      <h3 style={{ marginBottom: 8 }}>{judul}</h3>
      <p style={{ color: 'var(--ink-muted)' }}>{isi}</p>
    </div>
  )
}
