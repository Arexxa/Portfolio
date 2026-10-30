// Converts source PNG screenshots to resized WebP. Usage: npm run optimize-images -- <inDir> <outDir>
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const [inDir = 'raw-images', outDir = 'src/assets/img/projects'] = process.argv.slice(2)
const MAX_WIDTH = 960

await mkdir(outDir, { recursive: true })
for (const dir of await readdir(inDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  for (const file of await readdir(path.join(inDir, dir.name))) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue
    const name = `${dir.name.toLowerCase()}-${/(\d+)\.\w+$/.exec(file)?.[1] ?? '1'}.webp`
    const info = await sharp(path.join(inDir, dir.name, file))
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(outDir, name))
    console.log(`${name} ${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}kB`)
  }
}
