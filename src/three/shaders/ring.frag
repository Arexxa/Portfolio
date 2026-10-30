uniform vec3 uColor;
uniform float uInner;

varying vec2 vUv;

void main() {
  float r = distance(vUv, vec2(0.5)) * 2.0;
  float t = (r - uInner) / (1.0 - uInner);
  float bands = 0.55 + 0.45 * sin(t * 70.0) * sin(t * 23.0 + 1.7);
  float edge = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.82, 1.0, t));
  float alpha = bands * edge * 0.55;
  gl_FragColor = vec4(uColor, alpha);
}
