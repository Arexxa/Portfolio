uniform vec3 uBase;
uniform vec3 uAccent;
uniform vec3 uRim;
uniform vec3 uLightDir;
uniform float uTime;
uniform float uHover;

varying vec3 vObjPos;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x), mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x), mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z
  );
}

float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec3 p = vObjPos;
  float bands = fbm(vec3(p.x * 1.6, p.y * 5.0 + uTime * 0.01, p.z * 1.6));
  float detail = fbm(p * 6.0 + bands * 1.5);
  float mixAmount = smoothstep(0.25, 0.8, bands * 0.7 + detail * 0.5);
  vec3 albedo = mix(uBase, uAccent, mixAmount);

  vec3 n = normalize(vWorldNormal);
  float diffuse = max(dot(n, normalize(uLightDir)), 0.0);
  float ambient = 0.14;
  vec3 color = albedo * (ambient + diffuse * 1.05);

  float fresnel = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.6);
  color += uRim * fresnel * (0.55 + uHover * 0.9);
  color += uAccent * uHover * 0.12;

  gl_FragColor = vec4(color, 1.0);
}
