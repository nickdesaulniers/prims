function Sponge () {
  function Cube (xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
  };

  function divideCube (cube) {
    var xLenThird = (cube.xMax - cube.xMin) / 3;
    var xOneThird = cube.xMin + xLenThird;
    var xTwoThirds = cube.xMax - xLenThird;

    var yLenThird = (cube.yMax - cube.yMin) / 3;
    var yOneThird = cube.yMin + yLenThird;
    var yTwoThirds = cube.yMax - yLenThird;

    var zLenThird = (cube.zMax - cube.zMin) / 3;
    var zOneThird = cube.zMin + zLenThird;
    var zTwoThirds = cube.zMax - zLenThird;

    var cubes = [];
    var xs = [cube.xMin, xOneThird, xTwoThirds, cube.xMax];
    var ys = [cube.yMin, yOneThird, yTwoThirds, cube.yMax];
    var zs = [cube.zMin, zOneThird, zTwoThirds, cube.zMax];
    for (var x = 0; x < 3; ++x) {
      for (var y = 0; y < 3; ++y) {
        for (var z = 0; z < 3; ++z) {
          // 3. Remove the smaller cube in the middle of each face, and remove
          // the smaller cube in the very center of the larger cube, leaving 20
          // smaller cubes (second image). This is a level-1 Menger sponge
          // (resembling a Void Cube).
          if (x === 1 && y === 1) continue;
          if (x === 1 && z === 1) continue;
          if (y === 1 && z === 1) continue;
          cubes.push(new Cube(xs[x], xs[x + 1], ys[y], ys[y + 1], zs[z], zs[z + 1]));
        }
      }
    }
    return cubes;
  };

  function getVerticesFromCube (cube) {
    return [
      // Front face z: +1
      cube.xMax, cube.yMax, cube.zMax,
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMin, cube.yMin, cube.zMax,
      cube.xMax, cube.yMin, cube.zMax,
      // Right face x: +1
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMax, cube.yMax, cube.zMax,
      cube.xMax, cube.yMin, cube.zMax,
      cube.xMax, cube.yMin, cube.zMin,
      // Top face y: +1
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMax, cube.yMax, cube.zMax,
      // Left face x: -1
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMin, cube.yMin, cube.zMin,
      cube.xMin, cube.yMin, cube.zMax,
      // Bottom face y: -1
      cube.xMax, cube.yMin, cube.zMax,
      cube.xMin, cube.yMin, cube.zMax,
      cube.xMin, cube.yMin, cube.zMin,
      cube.xMax, cube.yMin, cube.yMin,
      // Back face z: -1
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMax, cube.yMin, cube.zMin,
      cube.xMin, cube.yMin, cube.zMin
    ];
  };

  function recursivelySubdivide (cube, n) {
    if (n === 0) return [cube];

    // 2. Divide every face of the cube into 9 squares, like a Rubik's Cube.
    // This will sub-divide the cube into 27 smaller cubes.
    var cubes = divideCube(cube);
    var x = [];
    // divideCube always returns 20 cubes; cubes.length === 20; 20 ^ 1
    for (var i = 0; i < 20; ++i) {
      // 4. Repeat steps 2 and 3 for each of the remaining smaller cubes, and
      // continue to iterate ad infinitum.
      x.push.apply(x, recursivelySubdivide(cubes[i], n - 1));
    }
    return x;
  };

  // The construction of a Menger sponge can be described as follows:
  // 1. Begin with a cube (first image).
  var cube = new Cube(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);

  const DEPTH = 2;
  const VERTICES_PER_CUBE = 24;

  var numCubes = Math.pow(20, DEPTH);
  var vertices = [];
  var cubes = recursivelySubdivide(cube, DEPTH);
  for (var i = 0; i < numCubes; ++i) {
    vertices.push.apply(vertices, getVerticesFromCube(cubes[i]));
  }

  // TODO: Hidden face removal

  // To test:
  //vertices = getVerticesFromCube({
    //xMin: -1.0,
    //xMax: 1.0,
    //yMin: -1.0,
    //yMax: 1.0,
    //zMin: -1.0,
    //zMax: 1.0,
  //});


  var indices = [];
  for (var i = 0, len = vertices.length / 3; i < len; i += 4) {
    indices.push(i, i + 1, i + 2, i, i + 2, i + 3);
  }

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

  for (var i = 0; i < vertices.length; i += 12) {
    var a = [vertices[i    ], vertices[i + 1], vertices[i + 2]];
    var b = [vertices[i + 3], vertices[i + 4], vertices[i + 5]];
    var c = [vertices[i + 6], vertices[i + 7], vertices[i + 8]]
    var normal = normalize(cross(sub(a, b), sub(a, c)));
    normals = normals.concat(normal, normal, normal, normal);
  }

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

