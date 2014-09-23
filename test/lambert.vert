uniform mat4 uView;
uniform mat4 uProj;
uniform mat4 uModel;

attribute vec4 aPosition;
attribute vec4 aNormal;

varying vec3 N;
varying vec3 P;

void main () {
  N = vec3(uModel * aNormal);
  P = vec3(uModel * aPosition);

  gl_Position = uProj * uView * uModel * aPosition;
}

