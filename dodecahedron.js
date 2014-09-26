function Dodecahedron () {
  var phi = (1 + Math.sqrt(5)) / 2;
  var b = 1 / phi;
  var c = 2 - phi;
  var ertices = [
     c,  0,  1,   -c,  0,  1,   -b,  b,  b,    0,  1,  c,    b,  b,  b,
    -c,  0,  1,    c,  0,  1,    b, -b,  b,    0, -1,  c,   -b, -b,  b,
     c,  0, -1,   -c,  0, -1,   -b, -b, -b,    0, -1, -c,    b, -b, -b,
    -c,  0, -1,    c,  0, -1,    b,  b, -b,    0,  1, -c,   -b,  b, -b,
     0,  1, -c,    0,  1,  c,    b,  b,  b,    1,  c,  0,    b,  b, -b,
     0,  1,  c,    0,  1, -c,   -b,  b, -b,   -1,  c,  0,   -b,  b,  b,
     0, -1, -c,    0, -1,  c,   -b, -b,  b,   -1, -c,  0,   -b, -b, -b,
     0, -1,  c,    0, -1, -c,    b, -b, -b,    1, -c,  0,    b, -b,  b,
     1,  c,  0,    1, -c,  0,    b, -b,  b,    c,  0,  1,    b,  b,  b,
     1, -c,  0,    1,  c,  0,    b,  b, -b,    c,  0, -1,    b, -b, -b,
    -1,  c,  0,   -1, -c,  0,   -b, -b, -b,   -c,  0, -1,   -b,  b, -b,
    -1, -c,  0,   -1,  c,  0,   -b,  b,  b,   -c,  0,  1,   -b, -b,  b
  ];

  var vertices = [];

  // The problem is that the five points listed are not 5 triangles, so we have
  // to find the middle of each set of five, and dupicate the last point.
  // Am I proud of this code?  No.
  for (var i = 0; i < ertices.length; i += 15) {
    var a = [ertices[i], ertices[i + 1], ertices[i + 2]];
    var b = [ertices[i + 3], ertices[i + 4], ertices[i + 5]];
    var c = [ertices[i + 6], ertices[i + 7], ertices[i + 8]];
    var d = [ertices[i + 9], ertices[i + 10], ertices[i + 11]];
    var e = [ertices[i + 12], ertices[i + 13], ertices[i + 14]];
    var center = [
      (a[0] + b[0] + c[0] + d[0] + e[0]) / 5,
      (a[1] + b[1] + c[1] + d[1] + e[1]) / 5,
      (a[2] + b[2] + c[2] + d[2] + e[2]) / 5
    ];
    vertices.push.apply(vertices, a);
    vertices.push.apply(vertices, b);
    vertices.push.apply(vertices, center);
    vertices.push.apply(vertices, b);
    vertices.push.apply(vertices, c);
    vertices.push.apply(vertices, center);
    vertices.push.apply(vertices, c);
    vertices.push.apply(vertices, d);
    vertices.push.apply(vertices, center);
    vertices.push.apply(vertices, d);
    vertices.push.apply(vertices, e);
    vertices.push.apply(vertices, center);
    vertices.push.apply(vertices, e);
    vertices.push.apply(vertices, a);
    vertices.push.apply(vertices, center);
  }

  var indices = new Array(vertices.length / 3);
  for (var i = 0; i < indices.length; ++i) indices[i] = i;

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

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};
