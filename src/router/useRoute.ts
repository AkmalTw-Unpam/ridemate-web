import { useEffect, useState } from 'react'

/**
 * Router hash sederhana.
 *
 * KENAPA BUKAN react-router-dom
 *
 * Situs ini enam halaman statis tanpa parameter, tanpa rute bersarang, dan
 * tanpa data yang dimuat per rute. Seluruh yang dibutuhkan muat dalam tiga
 * puluh baris di bawah, dan react-router menambah sekitar 20 KB terkirim
 * beserta satu dependensi yang harus ikut diperbarui seumur proyek.
 *
 * Memakai hash (#/fitur), bukan History API, karena hash berjalan di mana
 * pun hasil build ditaruh — GitHub Pages, subfolder hosting, bahkan dibuka
 * langsung dari berkas. Rute History API memerlukan server yang
 * mengembalikan index.html untuk setiap jalur; kalau tidak, menyegarkan
 * halaman /fitur menghasilkan 404. Itu kegagalan yang baru ketahuan setelah
 * situsnya terbit dan ada yang membagikan tautannya.
 *
 * Kalau suatu saat butuh rute berparameter, ganti berkas ini dengan
 * react-router — seluruh situs cuma memakai dua hal darinya: [useRoute] dan
 * komponen Link.
 */

export const ROUTES = {
  home: '/',
  features: '/fitur',
  rewards: '/lencana',
  community: '/komunitas',
  about: '/tentang',
  contact: '/kontak',
} as const

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]

function bacaHash(): string {
  const raw = window.location.hash.replace(/^#/, '')
  return raw === '' ? ROUTES.home : raw
}

export function useRoute(): string {
  const [path, setPath] = useState<string>(() =>
    typeof window === 'undefined' ? ROUTES.home : bacaHash()
  )

  useEffect(() => {
    const onChange = () => {
      setPath(bacaHash())
      // Gulir ke atas setiap pindah halaman. Tanpa ini, membuka halaman baru
      // dari tengah halaman sebelumnya mendarat di tengah juga, dan isinya
      // terbaca seperti sudah dibaca separuh.
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return path
}

export function navigate(to: string) {
  window.location.hash = to
}
