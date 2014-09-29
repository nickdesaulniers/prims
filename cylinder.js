// Derived from: http://jacksondunstan.com/articles/1924
function Cylinder () {
  var sides = 20;
  var height = 1.0;
  var stepTheta = 2 * Math.PI / sides;
  var verticesPerCap = 9 * sides;

  var vertices = [];
  var theta = 0;
  var i = 0;

  // Top Cap
  for (; i < verticesPerCap; i += 9) {
    vertices[i    ] = Math.cos(theta);
    vertices[i + 1] = height;
    vertices[i + 2] = Math.sin(theta);
    theta += stepTheta;

    vertices[i + 3] = 0.0;
    vertices[i + 4] = height;
    vertices[i + 5] = 0.0;

    vertices[i + 6] = Math.cos(theta);
    vertices[i + 7] = height;
    vertices[i + 8] = Math.sin(theta);
  }

  // Bottom Cap
  theta = 0;
  for (; i < verticesPerCap + verticesPerCap; i += 9) {
    vertices[i    ] = Math.cos(theta);
    vertices[i + 1] = -height;
    vertices[i + 2] = Math.sin(theta);
    theta += stepTheta;

    vertices[i + 3] = 0.0;
    vertices[i + 4] = -height;
    vertices[i + 5] = 0.0;

    vertices[i + 6] = Math.cos(theta);
    vertices[i + 7] = -height;
    vertices[i + 8] = Math.sin(theta);
  }

  for (var j = 0; j < sides; ++j) {
    // Top Right
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[0 + k + 9 * j];
    }
    // Top Left
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[6 + k + 9 * j];
    }
    // Bottom Right
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[verticesPerCap + k + 9 * j];
    }

    // Bottom Right
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[verticesPerCap + k + 9 * j];
    }

    // Top Left
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[6 + k + 9 * j];
    }

    // Bottom Left
    for (var k = 0; k < 3; ++k, ++i) {
      vertices[i] = vertices[verticesPerCap + 6 + k + 9 * j];
    }
  }


  var indices = new Array(vertices.length / 3);
  for (i = 0; i < indices.length; ++i) indices[i] = i;

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
