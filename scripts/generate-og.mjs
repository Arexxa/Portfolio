// Generates public/og-image.png (1200x630). Edit the text/colours below and run: node scripts/generate-og.mjs
import sharp from 'sharp'

const BG = '#050507'
const GREEN = '#39ff88'
const BLUE = '#2de2ff'
const MAGENTA = '#ff2bd6'
const INK = '#e4ebe7'
const MUTED = '#8c9a94'
const MONO = "'JetBrains Mono', Consolas, 'Courier New', monospace"
const SANS = "'Space Grotesk', Arial, Helvetica, sans-serif"

// Perspective grid floor: horizontal lines bunch toward the horizon, verticals fan out.
const horizon = 430
const floor = Array.from({ length: 9 }, (_, i) => {
  const y = horizon + Math.pow(i / 8, 2) * 200
  return `<line x1="0" y1="${y}" x2="1200" y2="${y}"/>`
}).join('')
const rays = Array.from({ length: 25 }, (_, i) => {
  const x = -1200 + i * 150
  return `<line x1="600" y1="${horizon}" x2="${x}" y2="630"/>`
}).join('')

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="${BG}"/>
  <g stroke="${GREEN}" stroke-opacity=".35" stroke-width="1.5">${floor}${rays}</g>
  <line x1="0" y1="${horizon}" x2="1200" y2="${horizon}" stroke="${BLUE}" stroke-width="2"/>
  <rect x="60" y="60" width="1080" height="320" fill="${BG}" stroke="rgb(255,255,255)" stroke-opacity=".22"/>
  <rect x="60" y="60" width="1080" height="40" fill="#12141a"/>
  <text x="80" y="87" font-family="${MONO}" font-size="18" fill="${MUTED}" letter-spacing="3">01  ~/whoami</text>
  <text x="1040" y="87" font-family="${MONO}" font-size="18" fill="${MUTED}" letter-spacing="3">[TTY1]</text>
  <text x="96" y="160" font-family="${MONO}" font-size="22" fill="${GREEN}" letter-spacing="5">SHAHRUL.OS // session active</text>
  <text x="96" y="250" font-family="${SANS}" font-weight="700" font-size="80" fill="${MAGENTA}" fill-opacity=".7" transform="translate(-4 0)">Shahrulnizam</text>
  <text x="96" y="250" font-family="${SANS}" font-weight="700" font-size="80" fill="${INK}">Shahrulnizam</text>
  <text x="96" y="310" font-family="${MONO}" font-size="26" fill="${BLUE}" letter-spacing="4">SENIOR SOFTWARE DEVELOPER</text>
  <text x="96" y="352" font-family="${MONO}" font-size="20" fill="${MUTED}">guest@shahrul.os:~$ help</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png')
console.log('public/og-image.png written')
