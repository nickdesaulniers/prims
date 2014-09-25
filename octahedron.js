function Octahedron () {
  // http://paulbourke.net/geometry/platonic/
  var a = 1 / Math.sqrt(2);
  var b = 1;
  var vertices = [
    -a,  0,  a,   -a,  0, -a,    0,  b,  0,
    -a,  0, -a,    a,  0, -a,    0,  b,  0,
     a,  0, -a,    a,  0,  a,    0,  b,  0,
     a,  0,  a,   -a,  0,  a,    0,  b,  0,
     a,  0, -a,   -a,  0, -a,    0, -b,  0,
    -a,  0, -a,   -a,  0,  a,    0, -b,  0,
     a,  0,  a,    a,  0, -a,    0, -b,  0,
    -a,  0,  a,    a,  0,  a,    0, -b,  0
  ];
  var indices = new Array(vertices.length);
  for (var i = 0; i < indices.length / 3; ++i) indices[i] = i;

  function sub (a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; };
  function cross (a, b) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0]
    ];
  };
  function normalize (a) {
    var length = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    return [a[0] / length, a[1] / length, a[2] / length];
  };

  var normals = [];

  for (var i = 0; i < vertices.length; i += 9) {
    var a = [vertices[i    ], vertices[i + 1], vertices[i + 2]];
    var b = [vertices[i + 3], vertices[i + 4], vertices[i + 5]];
    var c = [vertices[i + 6], vertices[i + 7], vertices[i + 8]]
    var normal = normalize(cross(sub(a, b), sub(a, c)));
    normals = normals.concat(normal, normal, normal);
  }

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

