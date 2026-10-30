import { useEffect, useRef, useState } from 'react'

/**
 * Mendeteksi kapan sebuah elemen masuk layar, supaya isinya bisa dimunculkan
 * saat itu juga dan bukan saat halaman dimuat.
 *
 * KENAPA IntersectionObserver, BUKAN EVENT SCROLL
 *
 * Cara lama adalah mendengarkan event scroll lalu memanggil
 * getBoundingClientRect() untuk tiap elemen yang diamati. Dua-duanya memaksa
 * peramban menghitung ulang tata letak — puluhan kali per detik, di thread
 * yang sama dengan yang menggambar halaman. Di ponsel kelas menengah itu
 * terasa sebagai gulir yang tersendat, dan justru halaman yang animasinya
 * paling banyak yang paling parah.
 *
 * IntersectionObserver dihitung peramban di luar thread itu dan hanya
 * memanggil balik saat ambangnya benar-benar terlampaui.
 *
 * SEKALI MUNCUL, TIDAK DISEMBUNYIKAN LAGI
 *
 * Observer-nya diputus begitu elemennya terlihat. Isi yang memudar lagi saat
 * digulir ke atas terbaca sebagai cacat, bukan sebagai animasi — dan orang
 * yang menggulir balik biasanya sedang mencari sesuatu yang sudah ia baca.
 *
 * DUA KEADAAN YANG HARUS LANGSUNG TAMPIL
 *
 * 1. Pengguna yang mematikan animasi di setelan sistemnya. Bagi sebagian
 *    orang gerak di layar memicu mual, dan itu bukan keputusan situs.
 * 2. Peramban tanpa IntersectionObserver. Lebih baik tidak ada animasi
 *    daripada halaman yang isinya tidak pernah muncul sama sekali.
 */
export function useMuncul<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [tampil, setTampil] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const kurangiGerak =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (kurangiGerak || typeof IntersectionObserver === 'undefined') {
      setTampil(true)
      return
    }

    const pengamat = new IntersectionObserver(
      (entri) => {
        if (entri.some((e) => e.isIntersecting)) {
          setTampil(true)
          pengamat.disconnect()
        }
      },
      {
        // Ambangnya kecil dan tepi bawahnya ditarik masuk sedikit: isinya
        // mulai muncul tepat sebelum benar-benar terlihat, jadi yang
        // menggulir cepat tidak pernah memergoki bagian yang masih kosong.
        threshold: 0.06,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    pengamat.observe(el)
    return () => pengamat.disconnect()
  }, [])

  return { ref, tampil }
}
