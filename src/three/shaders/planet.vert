varying vec3 vObjPos;
varying vec3 vWorldNormal;
varying vec3 vWorldPos;
varying vec3 vViewDir;

void main() {
  vObjPos = normalize(position);
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  vec4 world = modelMatrix * vec4(position, 1.0);
  vWorldPos = world.xyz;
  vViewDir = normalize(cameraPosition - world.xyz);
  gl_Position = projectionMatrix * viewMatrix * world;
}
