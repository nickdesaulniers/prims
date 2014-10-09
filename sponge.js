function Sponge () {
  function Cube (xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
  };

  var faceFns = [
    // left bottom back
    [pushLeft, pushBottom, pushBack],
    // left bottom middle
    [pushRight, pushTop, pushLeft, pushBottom],
    // left bottom front
    [pushFront, pushLeft, pushBottom],
    // left middle back
    [pushFront, pushRight, pushLeft, pushBack],
    // left middle middle
    // left middle front
    [pushFront, pushRight, pushLeft, pushBack],
    // left top back
    [pushTop, pushLeft, pushBack],
    // left top middle
    [pushRight, pushTop, pushLeft, pushBottom],
    // left top front
    [pushFront, pushTop, pushLeft],

    // middle bottom back
    [pushFront, pushTop, pushBottom, pushBack],
    // middle bottom middle
    // middle bottom front
    [pushFront, pushTop, pushBottom, pushBack],
    // middle middle back
    // middle middle middle
    // middle middle front
    // middle top back
    [pushFront, pushTop, pushBottom, pushBack],
    // middle top middle
    // middle top front
    [pushFront, pushTop, pushBottom, pushBack],

    // right bottom back
    [pushRight, pushBottom, pushBack],
    // right bottom middle
    [pushRight, pushTop, pushLeft, pushBottom],
    // right bottom front
    [pushFront, pushRight, pushBottom],
    // right middle back
    [pushFront, pushRight, pushLeft, pushBack],
    // right middle middle
    // right middle front
    [pushFront, pushRight, pushLeft, pushBack],
    // right top back
    [pushRight, pushTop, pushBack],
    // right top middle
    [pushRight, pushTop, pushLeft, pushBottom],
    // right top front
    [pushFront, pushRight, pushTop],
  ];

  function divideCube (cube, depth) {
    //console.log('calling divideCube with depth: ' + depth);
    var xLenThird = (cube.xMax - cube.xMin) / 3;
    var xOneThird = cube.xMin + xLenThird;
    var xTwoThirds = cube.xMax - xLenThird;

    var yLenThird = (cube.yMax - cube.yMin) / 3;
    var yOneThird = cube.yMin + yLenThird;
    var yTwoThirds = cube.yMax - yLenThird;

    var zLenThird = (cube.zMax - cube.zMin) / 3;
    var zOneThird = cube.zMin + zLenThird;
    var zTwoThirds = cube.zMax - zLenThird;

    var xs = [cube.xMin, xOneThird, xTwoThirds, cube.xMax];
    var ys = [cube.yMin, yOneThird, yTwoThirds, cube.yMax];
    var zs = [cube.zMin, zOneThird, zTwoThirds, cube.zMax];
    var i = 0;
    for (var x = 0; x < 3; ++x) {
      for (var y = 0; y < 3; ++y) {
        if (x === 1 && y === 1) continue;
        for (var z = 0; z < 3; ++z) {
          // 3. Remove the smaller cube in the middle of each face, and remove
          // the smaller cube in the very center of the larger cube, leaving 20
          // smaller cubes (second image). This is a level-1 Menger sponge
          // (resembling a Void Cube).
          if (x === 1 && z === 1) continue;
          if (y === 1 && z === 1) continue;
          var c = new Cube(xs[x], xs[x + 1], ys[y], ys[y + 1], zs[z], zs[z + 1]);
          if (depth === 1) {
            for (var j = 0, len = faceFns[i].length; j < len; ++j) {
              faceFns[i][j](c);
            }
          } else {
            divideCube(c, depth - 1);
          }
          ++i;
        }
      }
    }
  };

  function quadCat (arr) {
    return arr.concat(arr).concat(arr).concat(arr);
  };

  var nFront = quadCat([0.0, 0.0, 1.0]);
  var nRight = quadCat([1.0, 0.0, 0.0]);
  var nTop = quadCat([0.0, 1.0, 0.0]);
  var nLeft = quadCat([-1.0, 0.0, 0.0]);
  var nBottom = quadCat([0.0, -1.0, 0.0]);
  var nBack = quadCat([0.0, 0.0, -1.0]);
  var vertices = [];
  var normals = [];

  function pushFront (cube) {
    vertices.push(
      cube.xMax, cube.yMax, cube.zMax,
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMin, cube.yMin, cube.zMax,
      cube.xMax, cube.yMin, cube.zMax
    );
    normals.push.apply(normals, nFront);
  };

  function pushRight (cube) {
    vertices.push(
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMax, cube.yMax, cube.zMax,
      cube.xMax, cube.yMin, cube.zMax,
      cube.xMax, cube.yMin, cube.zMin
    );
    normals.push.apply(normals, nRight);
  };

  function pushTop (cube) {
    vertices.push(
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMax, cube.yMax, cube.zMax
    );
    normals.push.apply(normals, nTop);
  };

  function pushLeft (cube) {
    vertices.push(
      cube.xMin, cube.yMax, cube.zMax,
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMin, cube.yMin, cube.zMin,
      cube.xMin, cube.yMin, cube.zMax
    );
    normals.push.apply(normals, nLeft);
  };

  function pushBottom (cube) {
    vertices.push(
      cube.xMax, cube.yMin, cube.zMax,
      cube.xMin, cube.yMin, cube.zMax,
      cube.xMin, cube.yMin, cube.zMin,
      cube.xMax, cube.yMin, cube.zMin
    );
    normals.push.apply(normals, nBottom);
  };

  function pushBack (cube) {
    vertices.push(
      cube.xMin, cube.yMax, cube.zMin,
      cube.xMax, cube.yMax, cube.zMin,
      cube.xMax, cube.yMin, cube.zMin,
      cube.xMin, cube.yMin, cube.zMin
    );
    normals.push.apply(normals, nBack);
  };

  // The construction of a Menger sponge can be described as follows:
  // 1. Begin with a cube (first image).
  const DEPTH = 3;
  var cube = new Cube(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);

  console.time('vertices');
  if (DEPTH < 1) {
    pushFront(cube);
    pushRight(cube);
    pushTop(cube);
    pushLeft(cube);
    pushBottom(cube);
    pushBack(cube);
  } else {
    // 2. Divide every face of the cube into 9 squares, like a Rubik's Cube.
    // This will sub-divide the cube into 27 smaller cubes.
    divideCube(cube, DEPTH);
  }

  console.timeEnd('vertices');
  console.time('indices');

  var indices = [];
  for (var i = 0, len = vertices.length / 3; i < len; i += 4) {
    indices.push(i, i + 1, i + 2, i, i + 2, i + 3);
  }
  console.timeEnd('indices');

  return {
    vertices: vertices,
    indices: indices,
    normals: normals,
  };
};

