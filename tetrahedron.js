// http://2000clicks.com/MathHelp/GeometrySolidTetrahedron.aspx
function Tetrahedron () {
  var y = Math.sqrt(3) / 6;
  var z = Math.sqrt(2 / 3) / 4;

  var top   = [     0, 2 * y,    -z];
  var right = [ 1 / 2,    -y,    -z];
  var left  = [-1 / 2,    -y,    -z];
  var back  = [     0,     0, 3 * z];

  var vertices = [];
  // Front
  vertices.push.apply(vertices, top);
  vertices.push.apply(vertices, right);
  vertices.push.apply(vertices, left);
  // Right
  vertices.push.apply(vertices, top);
  vertices.push.apply(vertices, back);
  vertices.push.apply(vertices, right);
  // Left
  vertices.push.apply(vertices, top);
  vertices.push.apply(vertices, left);
  vertices.push.apply(vertices, back);
  // Bottom
  vertices.push.apply(vertices, left);
  vertices.push.apply(vertices, back);
  vertices.push.apply(vertices, right);

  var indices = [
    0,  1,  2,
    3,  4,  5,
    6,  7,  8,
    9, 10, 11
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
    var c = [vertices[i + 6], vertices[i + 7], vertices[i + 7]];
    // Normalizing is probably not necessary.
    // It should also be seperated out.
    var normal = normalize(cross(sub(a, b), sub(a, c)));
    normals = normals.concat(normal).concat(normal).concat(normal);
  }

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

