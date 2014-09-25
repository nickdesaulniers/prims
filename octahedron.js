function Octahedron () {
  var vertices = [
     1.0,  0.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  0.0,  1.0,
    -1.0,  0.0,  0.0,
     0.0, -1.0,  0.0,
     0.0,  0.0, -1.0,
  ];
  var indices = [
    0, 1, 2,
    0, 5, 1,
    0, 2, 4,
    0, 4, 5,
    3, 2, 1,
    3, 1, 5,
    3, 4, 2,
    3, 5, 4
  ];

  var n = Math.sqrt(1 / 3);
  var normals = [
     n,  n,  n,
     n,  n, -n,
     n, -n,  n,
     n, -n, -n,
    -n,  n,  n,
    -n,  n, -n,
    -n, -n,  n,
    -n, -n, -n
  ];

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

