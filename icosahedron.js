function Icosahedron () {
  var phi = (1 + Math.sqrt(5)) / 2;
  var a = 1;
  var b = 1 / phi;

  var vertices = [
     0,  b, -a,  -b,  a,  0,   b,  a,  0,
    -b,  a,  0,   0,  b,  a,   b,  a,  0,
     0, -b,  a,   0,  b,  a,  -a,  0,  b,
     a,  0,  b,   0,  b,  a,   0, -b,  a,
     0, -b, -a,   0,  b, -a,   a,  0, -b,
    -a,  0, -b,   0,  b, -a,   0, -b, -a,
     b, -a,  0,   0, -b,  a,  -b, -a,  0,
    -b, -a,  0,   0, -b, -a,   b, -a,  0,
    -a,  0,  b,  -b,  a,  0,  -a,  0, -b,
    -a,  0, -b,  -b, -a,  0,  -a,  0,  b,
     a,  0, -b,   b,  a,  0,   a,  0,  b,
     a,  0,  b,   b, -a,  0,   a,  0, -b,
    -a,  0,  b,   0,  b,  a,  -b,  a,  0,
     b,  a,  0,   0,  b,  a,   a,  0,  b,
    -b,  a,  0,   0,  b, -a,  -a,  0, -b,
     a,  0, -b,   0,  b, -a,   b,  a,  0,
    -a,  0, -b,   0, -b, -a,  -b, -a,  0,
     b, -a,  0,   0, -b, -a,   a,  0, -b,
    -b, -a,  0,   0, -b,  a,  -a,  0,  b,
     a,  0,  b,   0, -b,  a,   b, -a,  0
  ];

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
    var c = [vertices[i + 6], vertices[i + 7], vertices[i + 8]];
    // Normalizing is probably not necessary.
    // It should also be seperated out.
    var normal = normalize(cross(sub(a, b), sub(a, c)));
    normals = normals.concat(normal, normal, normal);
  }

  var indices = new Array(vertices.length / 3);

  for (var i = 0; i < indices.length; ++i) indices[i] = i;

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

