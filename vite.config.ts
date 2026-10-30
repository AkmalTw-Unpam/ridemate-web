import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Jalur relatif, bukan absolut.
  //
  // Bawaan Vite adalah '/', yang hanya benar kalau situsnya dipasang di akar
  // sebuah domain. Dengan './', hasil build juga berjalan dari subfolder atau
  // dibuka langsung dari berkas — dan itu yang membuatnya bisa diunggah ke
  // GitHub Pages atau subdirektori hosting tanpa satu pun perubahan.
  base: './',
  build: { outDir: 'dist', sourcemap: false },
})
