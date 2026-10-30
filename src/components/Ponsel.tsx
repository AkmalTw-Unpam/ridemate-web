/**
 * Mockup ponsel berisi tampilan mode perjalanan RideMate.
 *
 * DIGAMBAR ULANG, BUKAN TANGKAPAN LAYAR.
 *
 * Tangkapan layar aplikasi yang sebenarnya memuat nama, foto, dan rute milik
 * orang sungguhan — termasuk rider lain yang tidak pernah diminta izinnya
 * untuk tampil di situs. Yang digambar ulang di sini tidak memuat data
 * siapa pun, tetap tajam di layar beresolusi tinggi, dan ukurannya nol
 * kilobyte karena seluruhnya SVG.
 *
 * Yang ditampilkan mode perjalanan, bukan layar beranda: itu bagian yang
 * paling tidak bisa ditebak orang dari deskripsi teks, sekaligus yang paling
 * membedakan RideMate dari aplikasi peta biasa.
 */
export function Ponsel({ miring = true }: { miring?: boolean }) {
  return (
    <div className={`ponsel${miring ? ' ponsel--miring' : ''}`} aria-hidden="true">
      <div className="ponsel__bingkai">
        <div className="ponsel__poni" />
        <svg viewBox="0 0 300 620" className="ponsel__layar">
          {/* ---------- Peta ---------- */}
          <rect width="300" height="620" fill="#16232e" />
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

          {/* ---------- Pita rute, empat lapis seperti di aplikasi ---------- */}
          <g fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path d="M58 560 C58 470 140 440 140 356 C140 272 196 248 196 160" stroke="#d97a2b" strokeWidth="26" opacity="0.16" />
            <path d="M58 560 C58 470 140 440 140 356 C140 272 196 248 196 160" stroke="#8a4a14" strokeWidth="16" />
            <path d="M58 560 C58 470 140 440 140 356 C140 272 196 248 196 160" stroke="#d97a2b" strokeWidth="10" />
            <path d="M58 560 C58 470 140 440 140 356 C140 272 196 248 196 160" stroke="#f3c08a" strokeWidth="3" />
          </g>

          {/* ---------- Penanda tujuan: bendera oranye ---------- */}
          <g transform="translate(196 160)">
            <path d="M0 0 V-34" stroke="#faf4e8" strokeWidth="3.4" strokeLinecap="round" />
            <path d="M1.6 -34 H26 V-19 H1.6 Z" fill="#d97a2b" />
            <circle cx="0" cy="2" r="4.4" fill="#faf4e8" />
          </g>

          {/* ---------- Penanda rider lain ---------- */}
          <g opacity="0.95">
            <ellipse cx="140" cy="338" rx="9" ry="15" fill="#1f5c56" stroke="#faf4e8" strokeWidth="2.4" />
            <ellipse cx="121" cy="399" rx="9" ry="15" fill="#1f5c56" stroke="#faf4e8" strokeWidth="2.4" />
          </g>

          {/* ---------- Penanda saya: garis tepi oranye ---------- */}
          <g transform="translate(70 470)">
            <ellipse rx="11" ry="18" fill="#2b2f34" stroke="#d97a2b" strokeWidth="3.2" />
            <rect x="-5" y="-9" width="10" height="17" rx="3" fill="#d97a2b" />
            <rect x="-7" y="-13" width="14" height="4" rx="2" fill="#faf4e8" opacity="0.85" />
          </g>

          {/* ---------- Kartu bawah ---------- */}
          <g>
            <rect x="12" y="486" width="276" height="120" rx="22" fill="#14403c" />
            <rect x="28" y="504" width="104" height="11" rx="5.5" fill="#faf4e8" opacity="0.92" />
            <rect x="28" y="523" width="66" height="8" rx="4" fill="#8caa9e" opacity="0.8" />
            <rect x="188" y="500" width="84" height="26" rx="13" fill="#d97a2b" />
            <rect x="200" y="509" width="60" height="8" rx="4" fill="#16232e" opacity="0.85" />
            <g opacity="0.85">
              <circle cx="36" cy="560" r="10" fill="#1f5c56" />
              <circle cx="54" cy="560" r="10" fill="#1f5c56" />
              <circle cx="72" cy="560" r="10" fill="#1f5c56" />
              <rect x="92" y="555" width="74" height="9" rx="4.5" fill="#8caa9e" opacity="0.75" />
            </g>
            <rect x="28" y="582" width="150" height="7" rx="3.5" fill="#8caa9e" opacity="0.5" />
          </g>

          {/* ---------- Kepala ---------- */}
          <g>
            <rect x="12" y="26" width="276" height="54" rx="20" fill="#14403c" opacity="0.95" />
            <rect x="30" y="42" width="92" height="10" rx="5" fill="#faf4e8" opacity="0.9" />
            <rect x="30" y="58" width="58" height="7" rx="3.5" fill="#8caa9e" opacity="0.8" />
            <circle cx="262" cy="53" r="15" fill="#d97a2b" />
            <path d="M256 53h12M263 48l5 5-5 5" stroke="#16232e" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </svg>
      </div>
    </div>
  )
}
