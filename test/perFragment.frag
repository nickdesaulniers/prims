precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;

vec3 lightPosition = vec3(2, 2, 0);
vec3 ambient = vec3(0.3);
vec3 lightColor = vec3(1.0);

void main () {
  vec3 n = normalize(vNormal);
  vec3 l = lightPosition - vPosition;

  float nDotL = clamp(dot(n, normalize(l)) / length(l) * 2.0, 0.0, 1.0);
  vec3 color = abs(n);

  gl_FragColor = vec4(color, 1.0);
}
