import type { Lencana } from '../data/demo'

/**
 * Medali segi enam, bentuk dan warnanya sama dengan di aplikasi Android.
 *
 * Segi enam, bukan lingkaran: sederet lingkaran kecil terbaca sebagai
 * deretan foto profil, sedangkan segi enam langsung terbaca sebagai lencana.
 * Alasan yang sama tertulis di MedaliLencana.kt.
 *
 * Warnanya ditentukan TINGKAT, bukan satu warna per lencana. Perunggu,
 * perak, emas, platina — urutan yang sudah dibawa orang dari luar aplikasi
 * ini, dan satu lirik cukup untuk tahu mana yang lebih berharga tanpa
 * membaca satu angka pun.
 */

type Warna = { cincin: string; atas: string; bawah: string; isi: string }

const WARNA: Record<Lencana['tingkat'], Warna> = {
  Perunggu: { cincin: '#7A4522', atas: '#E0A86E', bawah: '#A2602F', isi: '#3D2110' },
  Perak:    { cincin: '#66737A', atas: '#DCE5EA', bawah: '#9AA8B0', isi: '#2A353B' },
  Emas:     { cincin: '#9C7014', atas: '#F7DE8A', bawah: '#CE9A24', isi: '#42300A' },
  Platina:  { cincin: '#14505A', atas: '#9FE6EE', bawah: '#2F8794', isi: '#0A262B' },
}

function titikSegiEnam(cx: number, cy: number, r: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = ((-90 + 60 * i) * Math.PI) / 180
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
}

export function Medali({
  tingkat,
  angka,
  satuan,
  ukuran = 92,
}: {
  tingkat: Lencana['tingkat']
  angka: string
  satuan: string
  ukuran?: number
}) {
  const w = WARNA[tingkat]
  const c = 50
  const id = `grad-${tingkat}`

  return (
    <svg
      width={ukuran}
      height={ukuran}
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Medali ${tingkat}, ${angka} ${satuan}`}
    >
      <defs>
        {/* Gradasi miring, bukan warna rata. Satu warna rata terbaca sebagai
            stiker; selisih terang-gelap dari atas ke bawah membuat mata
            membacanya sebagai permukaan logam. */}
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={w.atas} />
          <stop offset="100%" stopColor={w.bawah} />
        </linearGradient>
      </defs>

      <polygon points={titikSegiEnam(c, c, 48)} fill={w.cincin} />
      <polygon points={titikSegiEnam(c, c, 38)} fill={`url(#${id})`} />

      {/* Kilau dan bayangan, menegaskan arah cahaya dari kiri atas. */}
      <polygon points="18,36 48,13 60,20 25,52" fill="#ffffff" opacity="0.3" />
      <polygon points="28,71 79,57 82,68 39,85" fill="#000000" opacity="0.1" />

      <text
        x="50" y={satuan ? 50 : 56}
        textAnchor="middle"
        fontFamily="Poppins, sans-serif"
        fontWeight="800"
        fontSize={angka.length >= 5 ? 19 : 25}
        fill={w.isi}
      >
        {angka}
      </text>
      {satuan && (
        <text
          x="50" y="66"
          textAnchor="middle"
          fontFamily="Poppins, sans-serif"
          fontWeight="700"
          fontSize="11"
          letterSpacing="1.4"
          fill={w.isi}
        >
          {satuan}
        </text>
      )}
    </svg>
  )
}

/** Memecah "1.000 km ditempuh" jadi angka dan satuannya untuk badan medali. */
export function pecahSyarat(syarat: string): { angka: string; satuan: string } {
  const cocok = syarat.match(/^([\d.]+)\s*(\S+)/)
  if (!cocok) return { angka: '★', satuan: '' }
  return { angka: cocok[1], satuan: cocok[2].toUpperCase() }
}
