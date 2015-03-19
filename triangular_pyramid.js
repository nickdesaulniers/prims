function TriangularPyramid () {
  var h = Math.sqrt(2) / 2;
  var vertices = [
    // Bottom
    -h, -h, h, // left bottom front
    0.0, -h, -h, // center bottom back
    h, -h, h, // right bottom front

    // front
    -h, -h, h, // left bottom front
    h, -h, h, // right bottom front
    0.0, h, 0.0, // center top center

    // right
    h, -h, h, // right bottom front
    0.0, -h, -h, // center bottom back
    0.0, h, 0.0, // center top center

    // left
    -h, -h, h, // left bottom front
    0.0, h, 0.0, // center top center
    0.0, -h, -h // center bottom back
  ];

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
