import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { navigate } from '../router/useRoute'

/**
 * Tautan antar halaman di dalam situs.
 *
 * KENAPA TETAP <a href>, BUKAN <button onClick>
 *
 * Ini elemen <a> sungguhan dengan alamat sungguhan di dalamnya, dan itu
 * disengaja. Perayap mesin pencari menemukan halaman dengan membaca atribut
 * href; tombol yang memanggil JavaScript tidak terlihat sama sekali oleh
 * mereka. Selain itu, alamatnya muncul di pojok peramban saat kursor lewat,
 * bisa disalin lewat klik kanan, dan bisa dibuka di tab baru.
 *
 * YANG DICEGAT HANYA KLIK BIASA
 *
 * Klik tengah, Ctrl+klik, Cmd+klik, dan Shift+klik dibiarkan lewat ke
 * peramban apa adanya. Orang yang menahan Ctrl memang ingin membuka tab
 * baru, dan situs yang merebut gerakan itu terasa rusak meski semuanya
 * "berfungsi". Begitu juga target="_blank" dan klik yang sudah dibatalkan
 * penangan lain.
 */
export function Tautan({
  ke,
  children,
  className,
  ...sisa
}: {
  ke: string
  children: ReactNode
  className?: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  function onKlik(e: MouseEvent<HTMLAnchorElement>) {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      (e.currentTarget.target && e.currentTarget.target !== '_self')
    ) {
      return
    }
    e.preventDefault()
    navigate(ke)
  }

  return (
    <a href={ke} className={className} onClick={onKlik} {...sisa}>
      {children}
    </a>
  )
}
