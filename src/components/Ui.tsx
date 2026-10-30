import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { IkonInfo } from './Icons'
import { playStoreSiap, config } from '../services/config'
import { IkonUnduh } from './Icons'
import { useMuncul } from '../hooks/useMuncul'

/**
 * Pembungkus satu bagian halaman, lengkap dengan lebar maksimumnya.
 *
 * Sekaligus titik pasang animasi munculnya isi halaman. Dipasang di sini,
 * bukan di tiap halaman, karena setiap bagian di situs ini memang melewati
 * komponen ini — jadi satu perubahan menyalakan animasi di keenam halaman
 * sekaligus, dan tidak ada bagian yang kelupaan.
 *
 * Yang menggerakkan sebenarnya CSS; komponen ini cuma menambahkan kelas
 * is-tampil saat bagiannya masuk layar.
 */
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
  const { ref, tampil } = useMuncul<HTMLDivElement>()
  const kelasNada =
    nada === 'gelap' ? ' section--dark'
    : nada === 'malam' ? ' section--night'
    : nada === 'dalam' ? ' section--deep'
    : ''
  return (
    <section id={id} className={`section${rapat ? ' section--tight' : ''}${kelasNada}`}>
      <div ref={ref} className={`wrap muncul${tampil ? ' is-tampil' : ''}`}>
        {children}
      </div>
    </section>
  )
}

/**
 * Angka yang berhitung naik begitu masuk layar.
 *
 * aria-live sengaja TIDAK dipakai. Angka yang berubah enam puluh kali per
 * detik akan dibacakan pembaca layar berkali-kali, dan hasilnya bukan
 * informasi melainkan kebisingan. Pembaca layar membacanya sekali, setelah
 * animasinya berhenti, seperti teks biasa.
 *
 * Hitungannya hanya berjalan SEKALI seumur halaman — dijaga sudahJalan.
 * Tanpa itu, menggulir naik-turun melewati angkanya akan memulai ulang
 * animasi berkali-kali, dan yang tadinya detail kecil berubah jadi
 * gangguan.
 */
export function AngkaNaik({
  nilai,
  akhiran = '',
  durasi = 1400,
}: {
  nilai: number
  akhiran?: string
  durasi?: number
}) {
  const { ref, tampil } = useMuncul<HTMLSpanElement>()
  const [tampak, setTampak] = useState(0)
  const sudahJalan = useRef(false)

  useEffect(() => {
    if (!tampil || sudahJalan.current) return
    sudahJalan.current = true

    const kurangiGerak =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (kurangiGerak) {
      setTampak(nilai)
      return
    }

    let rangka = 0
    const mulai = performance.now()

    const langkah = (sekarang: number) => {
      const maju = Math.min(1, (sekarang - mulai) / durasi)
      // Melambat di ujung, bukan laju tetap. Angka yang berhenti mendadak
      // terbaca seperti halaman yang nge-lag, bukan seperti animasi.
      const halus = 1 - Math.pow(1 - maju, 3)
      setTampak(Math.round(nilai * halus))
      if (maju < 1) rangka = requestAnimationFrame(langkah)
    }

    rangka = requestAnimationFrame(langkah)
    return () => cancelAnimationFrame(rangka)
  }, [tampil, nilai, durasi])

  return (
    <span ref={ref}>
      {tampak.toLocaleString('id-ID')}
      {akhiran}
    </span>
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
