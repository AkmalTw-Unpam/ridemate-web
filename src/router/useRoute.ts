import { useEffect, useState } from 'react'
import daftarRute from './rute.json'

/**
 * Router sederhana berbasis History API.
 *
 * KENAPA BUKAN react-router-dom
 *
 * Situs ini enam halaman statis tanpa parameter, tanpa rute bersarang, dan
 * tanpa data yang dimuat per rute. Seluruh yang dibutuhkan muat dalam berkas
 * ini, dan react-router menambah sekitar 20 KB terkirim beserta satu
 * dependensi yang harus ikut diperbarui seumur proyek.
 *
 * KENAPA BUKAN HASH (#/fitur) LAGI
 *
 * Versi pertama memakai hash, karena hash berjalan di mana pun hasil build
 * ditaruh dan tidak pernah menghasilkan 404 saat halaman disegarkan. Itu
 * benar secara teknis dan salah secara tujuan.
 *
 * Bagi mesin pencari, apa pun di belakang "#" BUKAN halaman terpisah — ia
 * potongan alamat yang bahkan tidak dikirim ke server. Keenam halaman situs
 * ini terbaca Google sebagai satu alamat yang sama, ridemate.my.id/. Artinya
 * halaman Fitur, Lencana, Komunitas, Tentang, dan Kontak tidak akan pernah
 * muncul di hasil pencarian. Bukan "belum", melainkan tidak akan pernah.
 *
 * Untuk situs yang jadi pintu masuk utama sebelum aplikasinya terbit, itu
 * harga yang terlalu mahal untuk ditukar dengan kenyamanan build.
 *
 * MASALAH 404 YANG DULU JADI ALASAN, SEKARANG SUDAH DIJAWAB
 *
 * Alamat seperti /fitur hanya berfungsi kalau servernya punya berkas di
 * situ. Jawabannya bukan server, melainkan berkas sungguhan: scripts/
 * prarender.mjs menulis dist/fitur/index.html untuk tiap rute sesudah build.
 * GitHub Pages menyajikannya apa adanya dengan status 200 — disegarkan
 * berhasil, dibagikan berhasil, dan Google melihat enam halaman.
 */

type Rute = { jalur: string; nama: string; judul: string; deskripsi: string }

export const RUTE = daftarRute as Rute[]

export const ROUTES = {
  home: '/',
  features: '/fitur',
  rewards: '/lencana',
  community: '/komunitas',
  about: '/tentang',
  contact: '/kontak',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

/**
 * Membersihkan alamat jadi salah satu jalur yang dikenal.
 *
 * Garis miring di ujung dibuang supaya /fitur dan /fitur/ tidak pernah jadi
 * dua halaman berbeda — keduanya bisa muncul kalau ada yang mengetik manual
 * atau menyalin tautan dari tempat yang menambahkannya sendiri.
 */
export function rapikan(jalurMentah: string): string {
  let jalur = jalurMentah.split('?')[0].split('#')[0]
  if (jalur.length > 1 && jalur.endsWith('/')) jalur = jalur.slice(0, -1)
  if (jalur === '') jalur = ROUTES.home
  return RUTE.some((r) => r.jalur === jalur) ? jalur : ROUTES.home
}

export function useRoute(): string {
  const [path, setPath] = useState<string>(() =>
    typeof window === 'undefined' ? ROUTES.home : rapikan(window.location.pathname),
  )

  useEffect(() => {
    // popstate menangani tombol Mundur dan Maju peramban.
    // Peristiwa "rutemate" dikirim navigate() di bawah, karena
    // history.pushState TIDAK memicu popstate — kalau hanya popstate yang
    // didengarkan, mengklik menu tidak mengubah apa pun di layar.
    const onChange = () => {
      setPath(rapikan(window.location.pathname))
      // Gulir ke atas setiap pindah halaman. Tanpa ini, membuka halaman baru
      // dari tengah halaman sebelumnya mendarat di tengah juga, dan isinya
      // terbaca seperti sudah dibaca separuh.
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('popstate', onChange)
    window.addEventListener('rutemate', onChange)
    return () => {
      window.removeEventListener('popstate', onChange)
      window.removeEventListener('rutemate', onChange)
    }
  }, [])

  return path
}

export function navigate(to: string) {
  if (rapikan(window.location.pathname) === rapikan(to)) return
  window.history.pushState(null, '', to)
  window.dispatchEvent(new Event('rutemate'))
}
