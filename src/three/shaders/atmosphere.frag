uniform vec3 uColor;
uniform float uIntensity;

varying vec3 vNormal;
varying vec3 vViewDir;

void main() {
  float facing = max(-dot(normalize(vNormal), normalize(vViewDir)), 0.0);
  float glow = pow(facing, 2.0) * uIntensity;
  gl_FragColor = vec4(uColor * glow, glow);
}
