// Square "data" points (no texture lookup) tinted with the accent colour.
uniform vec3 uColor;

varying float vAlpha;

void main() {
  gl_FragColor = vec4(uColor, vAlpha);
  #include <colorspace_fragment>
}
