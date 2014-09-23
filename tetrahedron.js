// Magic Numbers:  r0 = ( 1, 0, 0 )
//                 r1 = ( -1/3, 2 sqrt(2) / 3, 0 )
//                 r2 = ( -1/3, - sqrt(2) / 3,  sqrt(6) / 3 )
//                 r3 = ( -1/3, - sqrt(2) / 3, -sqrt(6) / 3 )
function Tetrahedron () {
  var a = 1 / 3;
  var b = Math.sqrt(2) / 3;
  var c = Math.sqrt(6) / 3;

  var vertices = [
    1.0, 0.0, 0.0,
    -a,  2 * b, 0,
    -a, -b,     c,
    -a, -b,    -c
  ];

  var indices = [
    1, 3, 2,
    0, 2, 3,
    0, 3, 1,
    0, 1, 2
  ];

  var normals = vertices.slice();
  normals[0]  *= -1;
  normals[4]  *= -1;
  normals[8]  *= -1;
  normals[9]  *= -1;
  normals[10] *= -1;
  normals[11] *= -1;

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

