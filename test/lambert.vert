uniform mat4 uView;
uniform mat4 uProj;
uniform mat4 uModel;

attribute vec4 aPosition;
attribute vec4 aNormal;

varying vec3 vNormal;
varying vec3 vPosition;

void main () {
  vNormal = vec3(uModel * aNormal);
  vPosition = vec3(uModel * aPosition);

  gl_Position = uProj * uView * uModel * aPosition;
}

