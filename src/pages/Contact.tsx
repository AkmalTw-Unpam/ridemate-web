import { useState, type FormEvent } from 'react'
import { Bagian, JudulBagian, CatatanDemo } from '../components/Ui'
import { FAQ } from '../data/demo'
import { kirimPesan } from '../services/api'
import { config, apiSiap } from '../services/config'

type Galat = { nama?: string; email?: string; pesan?: string }

/** Pemeriksaan email yang sengaja longgar: ada isi, ada @, ada titik sesudahnya. */
function emailMasukAkal(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

export function Contact() {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [pesan, setPesan] = useState('')
  const [galat, setGalat] = useState<Galat>({})
  const [mengirim, setMengirim] = useState(false)
  const [hasil, setHasil] = useState<{ terkirim: boolean; catatan: string } | null>(null)

  function periksa(): boolean {
    const g: Galat = {}
    if (nama.trim().length < 2) g.nama = 'Isi namamu, minimal dua huruf.'
    if (!emailMasukAkal(email.trim())) g.email = 'Alamat emailnya belum benar.'
    if (pesan.trim().length < 10) g.pesan = 'Ceritakan sedikit lebih panjang, minimal sepuluh huruf.'
    setGalat(g)
    return Object.keys(g).length === 0
  }

  async function onKirim(e: FormEvent) {
    e.preventDefault()
    setHasil(null)
    if (!periksa()) return
    setMengirim(true)
    try {
      const h = await kirimPesan({ nama: nama.trim(), email: email.trim(), pesan: pesan.trim() })
      setHasil(h)
      if (h.terkirim) { setNama(''); setEmail(''); setPesan('') }
    } catch (err: unknown) {
      setHasil({
        terkirim: false,
        catatan: err instanceof Error ? `Gagal mengirim: ${err.message}` : 'Gagal mengirim.',
      })
    } finally {
      setMengirim(false)
    }
  }

  return (
    <>
      <Bagian nada="malam">
        <JudulBagian
          atas="Kontak &amp; FAQ"
          judul="Tanya apa saja"
          lede="Sebagian besar pertanyaan sudah terjawab di bawah. Kalau belum, formulirnya ada di bagian paling bawah halaman ini."
          tengah
        />
      </Bagian>

      <Bagian>
        <JudulBagian atas="FAQ" judul="Pertanyaan yang sering masuk" />
        <div className="faq">
          {FAQ.map((f) => (
            <details key={f.tanya} className="faq__item">
              <summary>{f.tanya}</summary>
              <p>{f.jawab}</p>
            </details>
          ))}
        </div>
      </Bagian>

      <Bagian nada="dalam">
        <div className="kontak">
          <div>
            <JudulBagian atas="Kirim pesan" judul="Belum terjawab?" />
            {!apiSiap && (
              <div style={{ marginBottom: 20 }}>
                <CatatanDemo anak="Backend belum tersambung, jadi formulir ini belum benar-benar mengirim apa pun. Validasinya sudah berjalan, dan hasilnya akan mengatakan apa adanya." />
              </div>
            )}

            <form className="form" onSubmit={onKirim} noValidate>
              <div className="form__baris">
                <label htmlFor="nama">Nama</label>
                <input
                  id="nama" type="text" value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  aria-invalid={galat.nama ? true : undefined}
                  aria-describedby={galat.nama ? 'galat-nama' : undefined}
                  placeholder="Nama panggilan juga boleh"
                />
                {galat.nama && <p id="galat-nama" className="form__galat">{galat.nama}</p>}
              </div>

              <div className="form__baris">
                <label htmlFor="email">Email</label>
                <input
                  id="email" type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={galat.email ? true : undefined}
                  aria-describedby={galat.email ? 'galat-email' : undefined}
                  placeholder="supaya kami bisa membalas"
                />
                {galat.email && <p id="galat-email" className="form__galat">{galat.email}</p>}
              </div>

              <div className="form__baris">
                <label htmlFor="pesan">Pesan</label>
                <textarea
                  id="pesan" rows={5} value={pesan}
                  onChange={(e) => setPesan(e.target.value)}
                  aria-invalid={galat.pesan ? true : undefined}
                  aria-describedby={galat.pesan ? 'galat-pesan' : undefined}
                  placeholder="Pertanyaan, masukan, atau laporan masalah"
                />
                {galat.pesan && <p id="galat-pesan" className="form__galat">{galat.pesan}</p>}
              </div>

              <button className="btn btn--solid" type="submit" disabled={mengirim}>
                {mengirim ? 'Mengirim…' : 'Kirim pesan'}
              </button>

              {hasil && (
                <p
                  className={`form__hasil${hasil.terkirim ? ' is-berhasil' : ''}`}
                  role="status" aria-live="polite"
                >
                  {hasil.catatan}
                </p>
              )}
            </form>
          </div>

          <aside className="kontak__samping">
            <h3>Cara lain</h3>
            {config.contactEmail ? (
              <p>
                Email langsung:{' '}
                <a href={`mailto:${config.contactEmail}`} className="tautan">
                  {config.contactEmail}
                </a>
              </p>
            ) : (
              <p className="kaki__redup">
                Alamat email belum dikonfigurasi. Isi <code>contactEmail</code> di{' '}
                <code>src/services/config.ts</code> untuk menampilkannya di sini.
              </p>
            )}
            <h3 style={{ marginTop: 22 }}>Masalah di aplikasi</h3>
            <p>
              Sertakan merek dan tipe ponsel, versi Android, serta langkah yang kamu
              lakukan sebelum masalahnya muncul. Tanpa itu, sebagian besar laporan
              tidak bisa ditelusuri.
            </p>
          </aside>
        </div>
      </Bagian>
    </>
  )
}
