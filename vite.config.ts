import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Jalur absolut, dan sekarang wajib begitu.
  //
  // Versi pertama memakai './' supaya hasil build juga jalan dari subfolder.
  // Itu berlaku selama tiap halaman disajikan dari berkas yang sama di akar.
  //
  // Sejak tiap rute punya berkasnya sendiri — /fitur/index.html, dan
  // seterusnya — './' justru merusak: dari halaman di /fitur/, alamat
  // './assets/bundel.js' dibaca peramban sebagai '/fitur/assets/bundel.js',
  // yang tidak ada. Halamannya tampil kosong tanpa pesan apa pun.
  //
  // Dengan '/', seluruh halaman memuat aset dari tempat yang sama. Harganya:
  // situs ini sekarang harus dipasang di akar sebuah domain, bukan di
  // subfolder. Itu memang yang terjadi di ridemate.my.id.
  base: '/',
  build: { outDir: 'dist', sourcemap: false },
})
