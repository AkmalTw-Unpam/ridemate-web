/**
 * Ikon digambar tangan sebagai SVG.
 *
 * KENAPA BUKAN lucide-react
 *
 * Situs ini memakai sebelas ikon. lucide-react membawa seluruh pustakanya
 * sebagai dependensi demi sebelas bentuk, dan setiap ikon di dalamnya sudah
 * dipakai ribuan situs lain — padahal permintaannya justru "hindari tampilan
 * yang terlalu generik". Yang digambar sendiri bisa disetel ketebalannya
 * supaya satu nada dengan hurufnya.
 *
 * Semuanya memakai currentColor, jadi warnanya ditentukan tempat ia dipasang
 * dan tidak ada satu pun warna yang dipatok di dalam berkas ini.
 */

type P = { size?: number; className?: string }

const dasar = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false,
})

export const IkonMotor = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <circle cx="5.5" cy="16.5" r="3.5" />
    <circle cx="18.5" cy="16.5" r="3.5" />
    <path d="M5.5 16.5h5l4.5-7h3.5" />
    <path d="M12 9.5h4" />
    <path d="M15 5.5h2.5l1.5 4" />
  </svg>
)

export const IkonRute = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <circle cx="6" cy="18.5" r="2.5" />
    <circle cx="18" cy="5.5" r="2.5" />
    <path d="M18 8v3.5a3.5 3.5 0 0 1-3.5 3.5h-5A3.5 3.5 0 0 0 6 18.5V16" />
  </svg>
)

export const IkonPeta = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 7 9 4.5Z" />
    <path d="M9 4.5V17M15 7v12.5" />
  </svg>
)

export const IkonLencana = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M12 2.6 20 7v10l-8 4.4L4 17V7Z" />
    <path d="m9.2 12 2 2 3.6-4" />
  </svg>
)

export const IkonOrang = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16.5 10.5a2.6 2.6 0 1 0 0-5" />
    <path d="M17 15c2 .5 3.5 2.3 3.5 5" />
  </svg>
)

export const IkonGrafik = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M4 20V10M10 20V5M16 20v-7M22 20H2" />
  </svg>
)

export const IkonPerisai = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M12 2.8 5 5.6v5.6c0 4.4 2.9 8.2 7 9.5 4.1-1.3 7-5.1 7-9.5V5.6Z" />
    <path d="m9.3 12 2 2 3.5-4" />
  </svg>
)

export const IkonPanah = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
)

export const IkonUnduh = ({ size = 22, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M12 3v12M7 10.5l5 5 5-5" />
    <path d="M4 20.5h16" />
  </svg>
)

export const IkonInfo = ({ size = 18, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.6v.5" />
  </svg>
)

export const IkonMenu = ({ size = 24, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IkonTutup = ({ size = 24, className }: P) => (
  <svg {...dasar(size)} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

/** Lambang RideMate: roda dan setang, disederhanakan sampai terbaca di 20px. */
export const Lambang = ({ size = 34, className }: P) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    aria-hidden
    focusable="false"
    className={className}
  >
    <rect width="32" height="32" rx="9" fill="var(--teal-deep)" />
    <g fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="19" r="4" stroke="var(--sunset)" />
      <circle cx="23.5" cy="19" r="4" stroke="var(--sunset)" />
      <path d="M8.5 19h5.5l4-7h5" stroke="var(--cream)" />
      <path d="M16 12.5h4" stroke="var(--cream)" />
    </g>
  </svg>
)
