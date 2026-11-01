// Anti-aliased neon grid that scrolls toward the camera and fades into the fog.
uniform float uTime;
uniform float uCell;
uniform float uSpeed;
uniform float uLineWidth;
uniform vec3 uColor;
uniform vec3 uFogColor;
uniform float uFogNear;
uniform float uFogFar;

varying vec3 vWorld;
varying float vDepth;

void main() {
  vec2 coord = vec2(vWorld.x, vWorld.z - uTime * uSpeed) / uCell;
  vec2 dist = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float line = 1.0 - min(min(dist.x, dist.y) / uLineWidth, 1.0);
  float fog = smoothstep(uFogNear, uFogFar, vDepth);
  vec3 color = mix(uColor * line * 0.75, uFogColor, fog);
  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
