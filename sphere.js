function Sphere () {
  var vertices = [];
  var textures = [];
  var normals = [];
  var indices = [];

  var latitudeBands = 30;
  var longitudeBands = 30;
  var radius = 1.0;

  for (var latNumber = 0; latNumber <= latitudeBands; ++latNumber) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber = 0; longNumber <= longitudeBands; ++ longNumber) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinTheta;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - longNumber / longitudeBands;
      var v = 1 - latNumber / latitudeBands;

      normals.push(x, y, z);
      textures.push(u, v);
      vertices.push(radius * x, radius * y, radius * z);
    }
  }

  for (latNumber = 0; latNumber < latitudeBands; ++latNumber) {
    for (longNumber = 0; longNumber < longitudeBands; ++ longNumber) {
      var first = latNumber * (longitudeBands + 1) + longNumber;
      var second = first + longitudeBands + 1;
      indices.push(first, second, first + 1, second, second + 1, first + 1);
    }
  }

  return {
    vertices: vertices,
    textures: textures,
    normals: normals,
    indices: indices,
  };
};
