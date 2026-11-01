// Points drift upward on the GPU; the CPU only advances uTime.
uniform float uTime;
uniform float uSpeed;
uniform float uHeight;
uniform float uSize;
uniform float uPixelRatio;

attribute float aSeed;

varying float vAlpha;

void main() {
  vec3 p = position;
  p.y = mod(p.y + uTime * uSpeed * (0.5 + aSeed), uHeight);
  vec4 view = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * view;
  gl_PointSize = uSize * uPixelRatio * (0.4 + aSeed) / -view.z;
  float edge = smoothstep(0.0, 1.5, p.y) * (1.0 - smoothstep(uHeight - 2.0, uHeight, p.y));
  vAlpha = edge * (1.0 - smoothstep(18.0, 48.0, -view.z)) * (0.35 + aSeed * 0.65);
}
