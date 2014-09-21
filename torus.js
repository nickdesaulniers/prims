function Torus () {
  var vertices = [];
  var indices = [];
  var normals = [];

  // https://code.google.com/p/min3d/source/browse/trunk/src/min3d/objectPrimitives/Torus.java?r=105
  var largeRadius = 1.0;
  var smallRadius = 0.4;
  var minWSegments = 30;
  var minHSegments = 30;

  var step1r = 2 * Math.PI / minWSegments;
  var step2r = 2 * Math.PI / minHSegments;

  var a1a = 0;
  var a1b = step1r;

  var vCount = 0;

  function getVertex (a1, r1, a2, r2) {
    var ca1 = Math.cos(a1);
    var ca2 = Math.cos(a2);
    var sa1 = Math.sin(a1);
    var sa2 = Math.sin(a2);
    var centerX = r1 * ca1;
    var centerZ = -r1 * sa1;
    var normalX = ca2 * ca1;
    var normalY = sa2;
    var normalZ = -ca2 * sa1;
    var x = centerX + r2 * normalX;
    var y = r2 * normalY;
    var z = centerZ + r2 * normalZ;

    normals.push(normalX, normalY, normalZ);
    vertices.push(x, y, z);
  };

  for (var s = 0; s < minWSegments; ++s, a1a = a1b, a1b += step1r) {
    var a2a = 0;
    var a2b = step2r;
    for (var s2 = 0; s2 < minHSegments; ++s2, a2a = a2b, a2b += step2r) {
      getVertex(a1a, largeRadius, a2a, smallRadius);
      getVertex(a1b, largeRadius, a2a, smallRadius);
      getVertex(a1b, largeRadius, a2b, smallRadius);
      getVertex(a1a, largeRadius, a2b, smallRadius);
      indices.push(vCount, vCount + 1, vCount + 2);
      indices.push(vCount, vCount + 2, vCount + 3);
      vCount += 4;
    }
  }
  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};
