import { useEffect, useRef, useState } from 'react'

/**
 * Mockup ponsel berisi empat layar RideMate yang bisa dipindah-pindah.
 *
 * DIGAMBAR ULANG, BUKAN TANGKAPAN LAYAR.
 *
 * Tangkapan layar aplikasi yang sebenarnya memuat nama, foto, dan rute milik
 * orang sungguhan — termasuk rider lain yang tidak pernah diminta izinnya
 * untuk tampil di situs. Yang digambar ulang di sini tidak memuat data
 * siapa pun, tetap tajam di layar beresolusi tinggi, dan ukurannya nol
 * kilobyte karena seluruhnya SVG.
 *
 * KENAPA EMPAT LAYAR, BUKAN SATU
 *
 * Satu gambar diam menjawab "aplikasinya kelihatan seperti apa". Empat layar
 * yang bisa ditekan menjawab pertanyaan yang sebenarnya dibawa pengunjung:
 * "apa saja yang bisa saya lakukan di dalamnya". Mode perjalanan tetap jadi
 * layar pertama karena itu yang paling tidak bisa ditebak orang dari
 * deskripsi teks.
 *
 * BERPUTAR SENDIRI SAMPAI DISENTUH
 *
 * Pengunjung yang hanya melewati halaman tetap melihat keempatnya. Begitu
 * ada yang menekan salah satu tab, putarannya berhenti selamanya — ia sudah
 * memilih, dan layar yang berpindah sendiri saat sedang diperhatikan adalah
 * salah satu hal paling menjengkelkan yang bisa dilakukan sebuah situs.
 */

const JEDA_PUTAR = 4200

/* ---------- Warna, disalin dari theme.css ---------- */
const KRIM = '#faf4e8'
const KRIM_TUA = '#f3e9d7'
const TEAL = '#14403c'
const TEAL_SEDANG = '#1f5c56'
const SAGE = '#8caa9e'
const MALAM = '#16232e'
const ORANYE = '#d97a2b'
const ORANYE_TUA = '#8a4a14'
const ORANYE_MUDA = '#f3c08a'
const EMAS = '#d9a62b'
const PERUNGGU = '#a2602f'

/* ============================================================
   Layar 1 — Mode perjalanan
   ============================================================ */
function LayarPerjalanan() {
  const rute = 'M58 560 C58 470 140 440 140 356 C140 272 196 248 196 160'
  return (
    <>
      <rect width="300" height="620" fill={MALAM} />
      <g opacity="0.5" stroke="#243643" strokeWidth="9" fill="none">
        <path d="M-20 140 H320" /><path d="M-20 330 H320" /><path d="M-20 500 H320" />
        <path d="M70 -20 V640" /><path d="M210 -20 V640" />
      </g>
      <g fill="#1d2d39" opacity="0.9">
        <rect x="12" y="152" width="44" height="36" rx="4" />
        <rect x="84" y="152" width="38" height="52" rx="4" />
        <rect x="224" y="168" width="52" height="40" rx="4" />
        <rect x="18" y="356" width="38" height="46" rx="4" />
        <rect x="226" y="350" width="48" height="56" rx="4" />
        <rect x="88" y="520" width="44" height="40" rx="4" />
      </g>

      {/* Pita rute, empat lapis seperti di aplikasi */}
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={rute} stroke={ORANYE} strokeWidth="26" opacity="0.16" />
        <path d={rute} stroke={ORANYE_TUA} strokeWidth="16" />
        <path d={rute} stroke={ORANYE} strokeWidth="10" />
        <path d={rute} stroke={ORANYE_MUDA} strokeWidth="3" />
      </g>

      {/* Penanda tujuan */}
      <g transform="translate(196 160)">
        <path d="M0 0 V-34" stroke={KRIM} strokeWidth="3.4" strokeLinecap="round" />
        <path d="M1.6 -34 H26 V-19 H1.6 Z" fill={ORANYE} />
        <circle cx="0" cy="2" r="4.4" fill={KRIM} />
      </g>

      {/* Rider lain */}
      <g opacity="0.95">
        <ellipse cx="140" cy="338" rx="9" ry="15" fill={TEAL_SEDANG} stroke={KRIM} strokeWidth="2.4" />
        <ellipse cx="121" cy="399" rx="9" ry="15" fill={TEAL_SEDANG} stroke={KRIM} strokeWidth="2.4" />
      </g>

      {/* Penanda saya */}
      <g transform="translate(70 470)">
        <ellipse rx="11" ry="18" fill="#2b2f34" stroke={ORANYE} strokeWidth="3.2" />
        <rect x="-5" y="-9" width="10" height="17" rx="3" fill={ORANYE} />
        <rect x="-7" y="-13" width="14" height="4" rx="2" fill={KRIM} opacity="0.85" />
      </g>

      {/* Kartu bawah */}
      <g>
        <rect x="12" y="486" width="276" height="120" rx="22" fill={TEAL} />
        <rect x="28" y="504" width="104" height="11" rx="5.5" fill={KRIM} opacity="0.92" />
        <rect x="28" y="523" width="66" height="8" rx="4" fill={SAGE} opacity="0.8" />
        <rect x="188" y="500" width="84" height="26" rx="13" fill={ORANYE} />
        <rect x="200" y="509" width="60" height="8" rx="4" fill={MALAM} opacity="0.85" />
        <g opacity="0.85">
          <circle cx="36" cy="560" r="10" fill={TEAL_SEDANG} />
          <circle cx="54" cy="560" r="10" fill={TEAL_SEDANG} />
          <circle cx="72" cy="560" r="10" fill={TEAL_SEDANG} />
          <rect x="92" y="555" width="74" height="9" rx="4.5" fill={SAGE} opacity="0.75" />
        </g>
        <rect x="28" y="582" width="150" height="7" rx="3.5" fill={SAGE} opacity="0.5" />
      </g>

      {/* Kepala */}
      <g>
        <rect x="12" y="26" width="276" height="54" rx="20" fill={TEAL} opacity="0.95" />
        <rect x="30" y="42" width="92" height="10" rx="5" fill={KRIM} opacity="0.9" />
        <rect x="30" y="58" width="58" height="7" rx="3.5" fill={SAGE} opacity="0.8" />
        <circle cx="262" cy="53" r="15" fill={ORANYE} />
        <path d="M256 53h12M263 48l5 5-5 5" stroke={MALAM} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  )
}

/* ============================================================
   Layar 2 — Daftar rencana touring
   ============================================================ */
function KartuRencana({ y, peserta, penuh }: { y: number; peserta: number; penuh?: boolean }) {
  return (
    <g transform={`translate(0 ${y})`}>
      <rect x="14" y="0" width="272" height="128" rx="18" fill="#fffdf8" stroke="rgba(22,35,46,0.1)" />
      {/* Garis rute: titik asal, garis, titik tujuan */}
      <g transform="translate(34 26)">
        <circle cx="0" cy="0" r="4.5" fill={TEAL_SEDANG} />
        <path d="M0 5 V27" stroke={SAGE} strokeWidth="2" strokeDasharray="3 4" />
        <circle cx="0" cy="32" r="4.5" fill={ORANYE} />
      </g>
      <rect x="50" y="21" width="112" height="9" rx="4.5" fill={TEAL} opacity="0.85" />
      <rect x="50" y="53" width="138" height="9" rx="4.5" fill={TEAL} opacity="0.85" />
      {/* Tanggal dan jarak */}
      <rect x="34" y="80" width="62" height="18" rx="9" fill={KRIM_TUA} />
      <rect x="42" y="86" width="46" height="6" rx="3" fill={TEAL} opacity="0.55" />
      <rect x="104" y="80" width="52" height="18" rx="9" fill={KRIM_TUA} />
      <rect x="112" y="86" width="36" height="6" rx="3" fill={TEAL} opacity="0.55" />
      {/* Peserta */}
      <g>
        {Array.from({ length: peserta }).map((_, i) => (
          <circle key={i} cx={38 + i * 15} cy="112" r="8" fill={TEAL_SEDANG} stroke="#fffdf8" strokeWidth="2" />
        ))}
      </g>
      {/* Tombol */}
      <rect x="196" y="98" width="72" height="24" rx="12" fill={penuh ? KRIM_TUA : ORANYE} />
      <rect x="210" y="107" width="44" height="7" rx="3.5" fill={penuh ? SAGE : MALAM} opacity={penuh ? 1 : 0.85} />
    </g>
  )
}

function LayarRencana() {
  return (
    <>
      <rect width="300" height="620" fill={KRIM} />
      {/* Kepala */}
      <rect x="0" y="0" width="300" height="104" fill={TEAL} />
      <rect x="24" y="44" width="110" height="13" rx="6.5" fill={KRIM} opacity="0.95" />
      <rect x="24" y="66" width="74" height="8" rx="4" fill={SAGE} opacity="0.85" />
      <circle cx="262" cy="56" r="16" fill={ORANYE} />
      <path d="M262 49v14M255 56h14" stroke={MALAM} strokeWidth="2.6" strokeLinecap="round" />

      {/* Saringan */}
      <g>
        <rect x="14" y="120" width="68" height="26" rx="13" fill={TEAL} />
        <rect x="28" y="130" width="40" height="7" rx="3.5" fill={KRIM} opacity="0.9" />
        <rect x="90" y="120" width="74" height="26" rx="13" fill="transparent" stroke={SAGE} />
        <rect x="104" y="130" width="46" height="7" rx="3.5" fill={SAGE} />
        <rect x="172" y="120" width="60" height="26" rx="13" fill="transparent" stroke={SAGE} />
        <rect x="186" y="130" width="32" height="7" rx="3.5" fill={SAGE} />
      </g>

      <KartuRencana y={162} peserta={4} />
      <KartuRencana y={306} peserta={2} />
      <KartuRencana y={450} peserta={6} penuh />
    </>
  )
}

/* ============================================================
   Layar 3 — Lencana
   ============================================================ */
function Heksagon({
  x, y, r, isi, tepi, terkunci,
}: { x: number; y: number; r: number; isi: string; tepi: string; terkunci?: boolean }) {
  // Heksagon berdiri (sudut di atas), sama dengan medali di aplikasi.
  const titik = Array.from({ length: 6 }, (_, i) => {
    const sudut = (Math.PI / 180) * (60 * i - 90)
    return `${(x + r * Math.cos(sudut)).toFixed(1)},${(y + r * Math.sin(sudut)).toFixed(1)}`
  }).join(' ')
  return (
    <g opacity={terkunci ? 0.32 : 1}>
      <polygon points={titik} fill={isi} stroke={tepi} strokeWidth="2.4" strokeLinejoin="round" />
      {terkunci ? (
        <g transform={`translate(${x} ${y})`} stroke={KRIM} strokeWidth="2" fill="none" strokeLinecap="round">
          <rect x="-6" y="-2" width="12" height="10" rx="2.5" fill={KRIM} stroke="none" />
          <path d="M-3.4 -2v-3.4a3.4 3.4 0 0 1 6.8 0V-2" />
        </g>
      ) : (
        <polyline
          points={`${x - 6},${y} ${x - 1.5},${y + 4.5} ${x + 6.5},${y - 4.5}`}
          fill="none" stroke={KRIM} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
        />
      )}
    </g>
  )
}

function LayarLencana() {
  const baris = [
    [{ isi: PERUNGGU, tepi: '#7a4522' }, { isi: '#9aa5ad', tepi: '#6d767d' }, { isi: EMAS, tepi: '#a67d1f' }],
    [{ isi: TEAL_SEDANG, tepi: TEAL }, { isi: PERUNGGU, tepi: '#7a4522' }, { isi: '#9aa5ad', tepi: '#6d767d' }],
    [{ isi: EMAS, tepi: '#a67d1f' }, { isi: TEAL_SEDANG, tepi: TEAL }, { isi: PERUNGGU, tepi: '#7a4522' }],
  ]
  return (
    <>
      <rect width="300" height="620" fill={KRIM} />
      <rect x="0" y="0" width="300" height="104" fill={TEAL} />
      <rect x="24" y="44" width="92" height="13" rx="6.5" fill={KRIM} opacity="0.95" />
      <rect x="24" y="66" width="120" height="8" rx="4" fill={SAGE} opacity="0.85" />

      {/* Ringkasan kemajuan */}
      <g>
        <rect x="14" y="122" width="272" height="78" rx="18" fill="#fffdf8" stroke="rgba(22,35,46,0.1)" />
        <rect x="32" y="142" width="86" height="10" rx="5" fill={TEAL} opacity="0.85" />
        <rect x="32" y="160" width="146" height="7" rx="3.5" fill={SAGE} />
        {/* Bilah kemajuan */}
        <rect x="32" y="178" width="236" height="8" rx="4" fill={KRIM_TUA} />
        <rect x="32" y="178" width="152" height="8" rx="4" fill={ORANYE} />
        <rect x="222" y="138" width="46" height="18" rx="9" fill={ORANYE} opacity="0.18" />
        <rect x="231" y="144" width="28" height="6" rx="3" fill={ORANYE} />
      </g>

      {/* Kisi lencana */}
      {baris.map((kolom, b) =>
        kolom.map((m, k) => {
          const x = 64 + k * 86
          const y = 258 + b * 118
          const terkunci = b * 3 + k >= 5
          return (
            <g key={`${b}-${k}`}>
              <Heksagon x={x} y={y} r={33} isi={m.isi} tepi={m.tepi} terkunci={terkunci} />
              <rect x={x - 26} y={y + 44} width="52" height="7" rx="3.5" fill={TEAL} opacity={terkunci ? 0.25 : 0.6} />
            </g>
          )
        }),
      )}
    </>
  )
}

/* ============================================================
   Layar 4 — Obrolan rombongan
   ============================================================ */
function Gelembung({
  y, lebar, baris, milikku,
}: { y: number; lebar: number; baris: number; milikku?: boolean }) {
  const x = milikku ? 286 - lebar : 14
  const tinggi = 20 + baris * 15
  return (
    <g>
      <rect
        x={x} y={y} width={lebar} height={tinggi} rx="16"
        fill={milikku ? TEAL : '#fffdf8'}
        stroke={milikku ? 'none' : 'rgba(22,35,46,0.1)'}
      />
      {Array.from({ length: baris }).map((_, i) => (
        <rect
          key={i}
          x={x + 14}
          y={y + 12 + i * 15}
          width={lebar - 28 - (i === baris - 1 ? 34 : 0)}
          height="7"
          rx="3.5"
          fill={milikku ? KRIM : TEAL}
          opacity={milikku ? 0.8 : 0.5}
        />
      ))}
    </g>
  )
}

function LayarObrolan() {
  return (
    <>
      <rect width="300" height="620" fill={KRIM} />
      <rect x="0" y="0" width="300" height="96" fill={TEAL} />
      <path d="M30 50l-9-9 9-9" stroke={KRIM} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 7)" />
      <circle cx="68" cy="56" r="17" fill={TEAL_SEDANG} stroke={KRIM} strokeWidth="1.6" />
      <circle cx="68" cy="51" r="5.4" fill={KRIM} opacity="0.9" />
      <path d="M59.5 65c1.6-4 4.8-6 8.5-6s6.9 2 8.5 6" fill={KRIM} opacity="0.9" />
      <rect x="96" y="46" width="94" height="10" rx="5" fill={KRIM} opacity="0.95" />
      <rect x="96" y="63" width="58" height="7" rx="3.5" fill={SAGE} opacity="0.9" />

      {/* Pembatas hari */}
      <rect x="112" y="118" width="76" height="20" rx="10" fill={KRIM_TUA} />
      <rect x="128" y="125" width="44" height="6" rx="3" fill={TEAL} opacity="0.45" />

      <Gelembung y={156} lebar={196} baris={2} />
      <Gelembung y={224} lebar={158} baris={1} milikku />
      <Gelembung y={272} lebar={212} baris={3} />
      <Gelembung y={356} lebar={180} baris={2} milikku />

      {/* Sedang mengetik */}
      <g>
        <rect x="14" y="424" width="76" height="34" rx="16" fill="#fffdf8" stroke="rgba(22,35,46,0.1)" />
        <circle cx="38" cy="441" r="4" fill={SAGE} />
        <circle cx="52" cy="441" r="4" fill={SAGE} opacity="0.65" />
        <circle cx="66" cy="441" r="4" fill={SAGE} opacity="0.4" />
      </g>

      {/* Kolom tulis */}
      <g>
        <rect x="0" y="536" width="300" height="84" fill={KRIM_TUA} />
        <rect x="14" y="558" width="222" height="40" rx="20" fill="#fffdf8" stroke="rgba(22,35,46,0.1)" />
        <rect x="34" y="574" width="104" height="8" rx="4" fill={SAGE} opacity="0.75" />
        <circle cx="264" cy="578" r="20" fill={ORANYE} />
        <path d="M256 578h14M264 571l7 7-7 7" stroke={MALAM} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </>
  )
}

/* ============================================================
   Rakitan
   ============================================================ */
const LAYAR = [
  { kunci: 'jalan', label: 'Perjalanan', gambar: <LayarPerjalanan /> },
  { kunci: 'rencana', label: 'Rencana', gambar: <LayarRencana /> },
  { kunci: 'lencana', label: 'Lencana', gambar: <LayarLencana /> },
  { kunci: 'obrolan', label: 'Obrolan', gambar: <LayarObrolan /> },
]

export function Ponsel({ miring = true }: { miring?: boolean }) {
  const [aktif, setAktif] = useState(0)
  const [dipegang, setDipegang] = useState(false)
  const bungkus = useRef<HTMLDivElement | null>(null)

  // Putaran otomatis berhenti dalam tiga keadaan: ada yang menekan tab,
  // pengguna mematikan animasi di sistemnya, atau ponselnya sedang tidak
  // terlihat di layar. Yang ketiga penting di halaman panjang — tanpa itu,
  // timer tetap berjalan dan baterai ikut terpakai untuk gambar yang tidak
  // sedang dilihat siapa pun.
  useEffect(() => {
    if (dipegang) return

    const kurangiGerak =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (kurangiGerak) return

    const el = bungkus.current
    let jam: ReturnType<typeof setInterval> | undefined

    const mulai = () => {
      if (jam) return
      jam = setInterval(() => setAktif((n) => (n + 1) % LAYAR.length), JEDA_PUTAR)
    }
    const henti = () => {
      if (jam) clearInterval(jam)
      jam = undefined
    }

    if (!el || typeof IntersectionObserver === 'undefined') {
      mulai()
      return henti
    }

    const pengamat = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? mulai() : henti()),
      { threshold: 0.3 },
    )
    pengamat.observe(el)
    return () => {
      pengamat.disconnect()
      henti()
    }
  }, [dipegang])

  const pilih = (i: number) => {
    setDipegang(true)
    setAktif(i)
  }

  return (
    <div className="ponsel-set" ref={bungkus}>
      <div className={`ponsel${miring ? ' ponsel--miring' : ''}`}>
        <div className="ponsel__bingkai">
          <div className="ponsel__poni" />
          <div className="ponsel__tumpuk">
            {LAYAR.map((l, i) => (
              <svg
                key={l.kunci}
                viewBox="0 0 300 620"
                className={`ponsel__layar${i === aktif ? ' is-aktif' : ''}`}
                aria-hidden="true"
              >
                {l.gambar}
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* Tombol sungguhan, bukan titik yang bisa diklik: namanya terbaca,
          bisa dicapai dengan Tab di papan ketik, dan pembaca layar
          menyebutkan layar mana yang sedang terbuka.
          role="tablist"/"tab" sengaja TIDAK dipakai. Pola tab mewajibkan
          tiap tab menunjuk sebuah tabpanel lewat aria-controls, dan di sini
          tidak ada panel — gambarnya aria-hidden, karena tidak ada
          informasi di dalamnya yang tidak sudah tertulis di halaman. Peran
          yang dipasang tanpa struktur pendukungnya justru menyesatkan
          pembaca layar. aria-pressed menyatakan hal yang sebenarnya
          terjadi: tombol ini sedang ditekan. */}
      <div className="ponsel__tab">
        {LAYAR.map((l, i) => (
          <button
            key={l.kunci}
            type="button"
            aria-pressed={i === aktif}
            aria-label={`Tampilkan layar ${l.label}`}
            className={i === aktif ? 'is-aktif' : undefined}
            onClick={() => pilih(i)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  )
}
