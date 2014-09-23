uniform mat4 uModelView;
attribute vec4 aPosition;
attribute vec4 aNormal;
varying vec4 vColor;

// hard coded for now
vec4 aColor = vec4(1.0, 0.0, 0.0, 1.0);
vec3 uLightColor = vec3(1.0, 1.0, 1.0);
vec3 uLightDirection = normalize(vec3(-0.5, 0.25, -0.75));
vec4 ambient = vec4(0.3, 0.0, 0.0, 1.0);

void main () {
  gl_Position = uModelView * aPosition;

  vec3 normal = normalize(vec3(aNormal));
  float nDotL = max(dot(uLightDirection, normal), 0.0);
  vec3 diffuse = uLightColor * vec3(aColor) * nDotL;
  /*vColor = aColor;*/
  vColor = vec4(diffuse, aColor.a) + ambient;
}

