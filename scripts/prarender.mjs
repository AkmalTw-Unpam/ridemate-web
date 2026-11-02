#!/usr/bin/env node
/**
 * Menulis satu berkas HTML sungguhan untuk tiap halaman, sesudah vite build.
 *
 * MASALAH YANG DIPECAHKAN
 *
 * GitHub Pages menyajikan berkas, bukan menjalankan server. Ia tidak tahu
 * apa-apa tentang router di dalam JavaScript. Membuka ridemate.my.id/fitur
 * membuatnya mencari berkas bernama fitur — tidak ketemu, lalu menjawab 404.
 *
 * Trik yang biasa dipakai orang adalah menyalin index.html jadi 404.html,
 * supaya halaman apa pun tetap memuat aplikasinya. Itu berfungsi untuk
 * manusia dan GAGAL untuk mesin pencari: statusnya tetap 404, dan Google
 * tidak pernah mengindeks halaman yang menjawab 404 — berapa pun bagusnya
 * isi yang tampil sesudahnya.
 *
 * Yang dilakukan skrip ini lebih sederhana dan lebih benar: membuat
 * berkasnya betulan. dist/fitur/index.html ada, jadi GitHub menjawab 200,
 * dan Google mengindeksnya seperti halaman mana pun.
 *
 * KENAPA ISINYA TETAP SAMA SEMUA
 *
 * Keenam berkas berisi aplikasi React yang sama; yang berbeda cuma <title>,
 * deskripsi, dan canonical-nya. Isi yang terbaca pengunjung tetap digambar
 * JavaScript sesudah halaman dimuat.
 *
 * Itu cukup. Google menjalankan JavaScript saat merayapi dan membaca isi
 * yang dihasilkannya. Yang TIDAK bisa ia tebak adalah bahwa /fitur itu
 * halaman tersendiri dengan judulnya sendiri — dan justru itu yang
 * dibereskan di sini.
 *
 * Prarender penuh, yang menanamkan seluruh teks ke dalam HTML, memang lebih
 * baik lagi: halamannya terbaca tanpa JavaScript sama sekali. Tapi itu
 * menuntut build kedua khusus server beserta mesinnya, dan untuk situs enam
 * halaman harganya belum sepadan. Catatan ini ditinggalkan supaya pilihannya
 * jelas kalau suatu saat dirasa perlu.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const AKAR = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(AKAR, 'dist')
const SITUS = 'https://ridemate.my.id'

const rute = JSON.parse(readFileSync(join(AKAR, 'src/router/rute.json'), 'utf8'))

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html tidak ada. Jalankan `vite build` lebih dulu.')
  process.exit(1)
}
const dasar = readFileSync(join(DIST, 'index.html'), 'utf8')

/** Menghindari tanda kutip dan kurung sudut merusak atribut HTML. */
function aman(teks) {
  return teks
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/**
 * Mengganti satu tag meta/title/link di dalam HTML.
 *
 * Kalau polanya TIDAK ketemu, skrip ini berhenti dengan galat alih-alih
 * diam-diam melewatkannya. Tag yang gagal diganti berarti keenam halaman
 * memakai judul yang sama lagi — persis kegagalan yang ingin dicegah, dan
 * satu-satunya yang tidak akan terlihat dari luar.
 */
function ganti(html, pola, pengganti, nama) {
  if (!pola.test(html)) {
    console.error(`Gagal: ${nama} tidak ditemukan di dist/index.html.`)
    console.error('Kemungkinan besar index.html diubah. Sesuaikan skrip ini.')
    process.exit(1)
  }
  return html.replace(pola, pengganti)
}

let jumlah = 0
for (const r of rute) {
  const alamat = SITUS + (r.jalur === '/' ? '/' : r.jalur)
  let html = dasar

  html = ganti(html, /<title>[\s\S]*?<\/title>/, `<title>${aman(r.judul)}</title>`, '<title>')
  html = ganti(
    html,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${aman(r.deskripsi)}" />`,
    'meta description',
  )
  html = ganti(
    html,
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${alamat}" />`,
    'link canonical',
  )
  html = ganti(
    html,
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${alamat}" />`,
    'og:url',
  )
  html = ganti(
    html,
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${aman(r.judul)}" />`,
    'og:title',
  )
  html = ganti(
    html,
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${aman(r.deskripsi)}" />`,
    'og:description',
  )

  // Beranda menimpa dist/index.html yang sudah ada; sisanya dapat foldernya
  // sendiri, supaya /fitur dan /fitur/ sama-sama berfungsi.
  const tujuan = r.jalur === '/' ? join(DIST, 'index.html') : join(DIST, r.jalur, 'index.html')
  mkdirSync(dirname(tujuan), { recursive: true })
  writeFileSync(tujuan, html)
  jumlah++
}

/* ------------------------------------------------------------
   sitemap.xml
   ------------------------------------------------------------
   Dibangkitkan dari daftar rute yang sama, bukan ditulis tangan. Sitemap
   yang ditulis tangan selalu ketinggalan satu halaman cepat atau lambat,
   dan kesalahannya tidak pernah terlihat — halaman itu cuma tidak pernah
   muncul di Google. */

/**
 * Halaman HTML statis di public/ yang juga pantas terindeks.
 *
 * Keduanya bukan bagian dari aplikasi React — mereka berkas HTML berdiri
 * sendiri — jadi tidak ikut terbawa daftar rute di atas.
 *
 * KENAPA HANYA DUA DARI LIMA
 *
 * privasi.html dan hapus-akun.html adalah dua alamat yang diminta Google
 * Play saat mendaftarkan aplikasi, dan keduanya pantas ditemukan orang
 * yang mencarinya sendiri.
 *
 * Tiga sisanya sengaja TIDAK di sini:
 * - akun-aktif.html dan ganti-password.html cuma bermakna kalau dibuka
 *   dari tautan email; berdiri sendiri mereka halaman kosong.
 * - pantau/ tidak boleh terindeks sama sekali — alamatnya memuat token
 *   perjalanan seseorang. Ia dilarang di robots.txt dan di meta robots
 *   halamannya sendiri.
 */
const HALAMAN_STATIS = ['/privasi.html', '/hapus-akun.html']

const hariIni = new Date().toISOString().slice(0, 10)
const semuaAlamat = [
  ...rute.map((r) => ({
    alamat: SITUS + (r.jalur === '/' ? '/' : r.jalur),
    prioritas: r.jalur === '/' ? '1.0' : '0.8',
  })),
  ...HALAMAN_STATIS.map((j) => ({ alamat: SITUS + j, prioritas: '0.5' })),
]

const sitemap =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  semuaAlamat
    .map(
      (u) =>
        `  <url>\n    <loc>${u.alamat}</loc>\n    <lastmod>${hariIni}</lastmod>\n    <priority>${u.prioritas}</priority>\n  </url>`,
    )
    .join('\n') +
  '\n</urlset>\n'

writeFileSync(join(DIST, 'sitemap.xml'), sitemap)

console.log(`Prarender: ${jumlah} halaman + sitemap.xml`)
