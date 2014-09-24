var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl', { preserveDrawingBuffer: true }) || canvas.getContext('experimental-webgl');
var loader = new WebGLShaderLoader(gl);
loader.loadFromXHR('lambert.vert', 'perVertex.frag',
    function (errors, program) {
  if (errors.length) return console.error.apply(console, errors);

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.useProgram(program);
  gl.enable(gl.DEPTH_TEST);
  var n = createBuffers(gl, program);
  var uniforms = loader.getUniforms(gl, program);
  var modelMatrix = setUniforms(uniforms);

  var previous = performance.now();
  var d = degPerPeriod(10);
  (function anim (t) {
    var dt = t - previous;
    previous = t;
    mat4.rotateZ(modelMatrix, modelMatrix, d2r(dt * d));
    gl.uniformMatrix4fv(uniforms.uModel, false, modelMatrix)
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // since ELEMENT_ARRAY_BUFFER was given a Uint16Array
    gl.drawElements(gl.TRIANGLES, n, gl.UNSIGNED_SHORT, 0);
    requestAnimationFrame(anim);
  })(previous);
});

function initBuffer (gl, type, data, elemPerVertex, attribute) {
  var buffer = gl.createBuffer();
  if (!buffer) throw new Error('Failed to create buffer');
  gl.bindBuffer(type, buffer);
  gl.bufferData(type, data, gl.STATIC_DRAW);
  if (type === gl.ARRAY_BUFFER) {
    gl.vertexAttribPointer(attribute, elemPerVertex, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(attribute);
  }
};

function d2r (deg) { return deg * Math.PI / 180.0; };
function degPerPeriod (period) { return 0.36 / period; };

function createBuffers (gl, program) {
  var attributes = loader.getAttributes(gl, program);

  //var geometry = Tetrahedron();
  //var geometry = Octahedron();
  var geometry = Torus();
  //var geometry = Sphere();
  //var geometry = Cube();
  console.log(geometry.vertices.length, geometry.indices.length, geometry.normals.length);
  initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(geometry.vertices), 3, attributes.aPosition);
  initBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(geometry.normals), 3, attributes.aNormal);
  initBuffer(gl, gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geometry.indices));

  return geometry.indices.length;
};

function setUniforms (uniforms) {
  var proj = mat4.create();
  mat4.perspective(proj, d2r(75.0), canvas.width / canvas.height, 0.01, 50.0);
  var modelMatrix = createModelMatrix();
  var viewMatrix = createViewMatrix();
  gl.uniformMatrix4fv(uniforms.uView, false, viewMatrix);
  gl.uniformMatrix4fv(uniforms.uModel, false, modelMatrix);
  gl.uniformMatrix4fv(uniforms.uProj, false, proj);
  return modelMatrix;
};

function createModelMatrix () {
  var modelMatrix = mat4.create();
  mat4.scale(modelMatrix, modelMatrix, vec3.fromValues(0.8, 0.8, 0.8));
  return modelMatrix;
};
function createViewMatrix () {
  var eye = vec3.fromValues(0, 2, 2);
  var center = vec3.fromValues(0, 0, 0);
  var up = vec3.fromValues(0, 1, 0);
  var viewMatrix = mat4.create();
  mat4.lookAt(viewMatrix, eye, center, up);
  return viewMatrix;
};

