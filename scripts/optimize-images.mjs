// Builds responsive project screenshots + blur placeholders.
//
// Usage: npm run optimize-images [-- <dir>]   (default dir: src/assets/img/projects)
//
// For every master image `<name>.webp|png|jpg` (no -480/-960 suffix) it writes
// `<name>-480.avif`, `<name>-480.webp`, `<name>-960.avif`, `<name>-960.webp` and records
// `{ width, height, lqip }` for the 960w variant in `manifest.json`. src/data/projects.ts
// reads the manifest, so adding a screenshot = drop a master here, run this, reference it.
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [dir = 'src/assets/img/projects'] = process.argv.slice(2)
const WIDTHS = [480, 960]
const MASTER = /^(?!.*-(?:480|960)\.)(.+)\.(webp|png|jpe?g)$/i

const manifest = {}
for (const file of (await readdir(dir)).sort()) {
  const match = MASTER.exec(file)
  if (!match) continue
  const name = match[1]
  const input = path.join(dir, file)
  let size = { width: 0, height: 0 }

  for (const width of WIDTHS) {
    const base = sharp(input).resize({ width, withoutEnlargement: true })
    const info = await base
      .clone()
      .webp({ quality: 76 })
      .toFile(path.join(dir, `${name}-${width}.webp`))
    await base
      .clone()
      .avif({ quality: 52, effort: 6 })
      .toFile(path.join(dir, `${name}-${width}.avif`))
    size = { width: info.width, height: info.height }
  }

  const lqip = await sharp(input).resize({ width: 16 }).webp({ quality: 40 }).toBuffer()
  manifest[name] = { ...size, lqip: `data:image/webp;base64,${lqip.toString('base64')}` }
  console.log(`${name} ${size.width}x${size.height}`)
}

await writeFile(path.join(dir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`manifest.json: ${Object.keys(manifest).length} images`)
