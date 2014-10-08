function Sierpinski () {
  function mix (vecA, vecB, percent) {
    var len = Math.min(vecA.length, vecB.length);
    var vecC = new Array(len);
    if (percent > 1 || percent < 0) throw new Error('bad percent');
    for (var i = 0; i < len; ++i) {
      vecC[i] = vecA[i] * (1 - percent) + vecB[i] * percent;
    }
    return vecC;
  };

  function divideTetra (a, b, c, d, count) {
    if (count === 0) {
      return a.concat(c, b).concat(a.concat(d, c), a.concat(b, d), b.concat(c, d));
    }

    var ab = mix(a, b, 0.5);
    var ac = mix(a, c, 0.5);
    var ad = mix(a, d, 0.5);
    var bc = mix(b, c, 0.5);
    var bd = mix(b, d, 0.5);
    var cd = mix(c, d, 0.5);
    --count;
    return divideTetra(a, ab, ac, ad, count).concat(
      divideTetra(ab, b, bc, bd, count),
      divideTetra(ac, bc, c, cd, count),
      divideTetra(ad, bd, cd, d, count)
    );
  };
  var corners = [
    [0.0,  0.0, -1.0],
    [0.0,  0.9428,  0.3333],
    [-0.8165, -0.4714,  0.3333],
    [0.8165, -0.4714,  0.3333]
  ];
  const numSubDivisions = 3;
  var vertices = divideTetra(corners[0], corners[1], corners[2], corners[3],
                             numSubDivisions);

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
