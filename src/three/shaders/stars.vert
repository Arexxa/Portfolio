attribute float aSize;
attribute float aSeed;
attribute vec3 aColor;

uniform float uTime;
uniform float uPixelRatio;

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed * 1.8) + aSeed * 40.0);
  gl_PointSize = clamp(aSize * uPixelRatio * (220.0 / -mv.z), 1.0, 7.0 * uPixelRatio);
  vColor = aColor;
  vAlpha = twinkle;
  gl_Position = projectionMatrix * mv;
}
