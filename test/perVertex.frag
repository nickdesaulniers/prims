precision mediump float;

varying vec3 N;
varying vec3 P;

vec3 L = vec3(2, 2, 0);
vec3 ambient = vec3(0.1);
vec3 uLightColor = vec3(1.0);

void main () {
  vec3 n = normalize(N);
  vec3 l = L - P;

  float nDotL = clamp(dot(n, normalize(l))/length(l)*2.0, 0.0, 1.0);
  vec3 color = nDotL*uLightColor + ambient;

  gl_FragColor = vec4(color, 1.0);
}
