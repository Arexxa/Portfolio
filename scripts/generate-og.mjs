// Generates public/og-image.png (1200x630). Edit the text/colors below and run: node scripts/generate-og.mjs
import sharp from 'sharp'

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="v" cx="25%" cy="20%" r="70%"><stop offset="0" stop-color="#8b5cf6" stop-opacity=".45"/><stop offset="1" stop-color="#04060d" stop-opacity="0"/></radialGradient>
    <radialGradient id="c" cx="85%" cy="80%" r="60%"><stop offset="0" stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#04060d" stop-opacity="0"/></radialGradient>
    <radialGradient id="p" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#ff8a3d"/><stop offset=".6" stop-color="#7a2a0a"/><stop offset="1" stop-color="#000"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".6" stop-color="#8b5cf6"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#04060d"/>
  <rect width="1200" height="630" fill="url(#v)"/>
  <rect width="1200" height="630" fill="url(#c)"/>
  <circle cx="930" cy="300" r="170" fill="url(#p)"/>
  <circle cx="930" cy="300" r="182" fill="none" stroke="#ff8a3d" stroke-opacity=".35" stroke-width="6"/>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="74" fill="url(#t)">SHAHRULNIZAM</text>
  <text x="80" y="370" font-family="Arial, Helvetica, sans-serif" font-size="34" fill="#e8ecf8">Senior Software Developer</text>
  <text x="80" y="425" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#9aa6c4">Fly through an interactive 3D galaxy portfolio</text>
</svg>`

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile('public/og-image.png')
console.log('public/og-image.png written')
