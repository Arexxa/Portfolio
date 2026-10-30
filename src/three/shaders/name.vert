attribute vec3 aStart;
attribute float aSeed;

uniform float uAssemble;
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform float uTextWidth;

varying float vMix;
varying float vAlpha;

void main() {
  float p = clamp(uAssemble * 1.5 - aSeed * 0.5, 0.0, 1.0);
  float eased = 1.0 - pow(1.0 - p, 3.0);
  vec3 pos = mix(aStart, position, eased);
  float settled = smoothstep(0.85, 1.0, p);
  pos.y += sin(uTime * 0.9 + aSeed * 30.0) * 0.035 * settled;
  pos.z += cos(uTime * 0.7 + aSeed * 20.0) * 0.05 * settled;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = uSize * uPixelRatio * (24.0 / -mv.z) * (0.7 + 0.5 * aSeed);
  vMix = clamp(position.x / uTextWidth + 0.5, 0.0, 1.0);
  vAlpha = 0.35 + 0.65 * eased;
  gl_Position = projectionMatrix * mv;
}
