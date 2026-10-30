uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;

varying float vMix;
varying float vAlpha;

void main() {
  float d = distance(gl_PointCoord, vec2(0.5));
  float a = smoothstep(0.5, 0.05, d) * vAlpha;
  if (a < 0.01) discard;
  vec3 color = vMix < 0.5 ? mix(uColorA, uColorB, vMix * 2.0) : mix(uColorB, uColorC, (vMix - 0.5) * 2.0);
  gl_FragColor = vec4(color, a);
}
