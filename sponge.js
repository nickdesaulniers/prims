function Sponge () {
  function Cube (xMin, xMax, yMin, yMax, zMin, zMax) {
    this.xMin = xMin;
    this.xMax = xMax;
    this.yMin = yMin;
    this.yMax = yMax;
    this.zMin = zMin;
    this.zMax = zMax;
    this.facesToKeep = {
      front: true,
      right: true,
      top: true,
      left: true,
      bottom: true,
      back: true,
    };
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
    // There's definitely a nicer way to do this
    // left bottom back
    cubes[0].facesToKeep.right = false;
    cubes[0].facesToKeep.front = false;
    cubes[0].facesToKeep.top = false;
    // left bottom middle
    cubes[1].facesToKeep.back = false;
    cubes[1].facesToKeep.front = false;
    // left bottom front
    cubes[2].facesToKeep.back = false;
    cubes[2].facesToKeep.top = false;
    cubes[2].facesToKeep.right = false;
    // left middle back
    cubes[3].facesToKeep.bottom = false;
    cubes[3].facesToKeep.top = false;
    // left middle middle
    // left middle front
    cubes[4].facesToKeep.top = false;
    cubes[4].facesToKeep.bottom = false;
    // left top back
    cubes[5].facesToKeep.right = false;
    cubes[5].facesToKeep.front = false;
    cubes[5].facesToKeep.bottom = false;
    // left top middle
    cubes[6].facesToKeep.front = false;
    cubes[6].facesToKeep.back = false;
    // left top front
    cubes[7].facesToKeep.back = false;
    cubes[7].facesToKeep.right = false;
    cubes[7].facesToKeep.bottom = false;

    // middle bottom back
    cubes[8].facesToKeep.left = false;
    cubes[8].facesToKeep.right = false;
    // middle bottom middle
    // middle bottom front
    cubes[9].facesToKeep.left = false;
    cubes[9].facesToKeep.right = false;
    // middle middle back
    // middle middle middle
    // middle middle front
    // middle top back
    cubes[10].facesToKeep.left = false;
    cubes[10].facesToKeep.right = false;
    // middle top middle
    // middle top front
    cubes[11].facesToKeep.left = false;
    cubes[11].facesToKeep.right = false;

    // right bottom back
    cubes[12].facesToKeep.left = false;
    cubes[12].facesToKeep.top = false;
    cubes[12].facesToKeep.front = false;
    // right bottom middle
    cubes[13].facesToKeep.back = false;
    cubes[13].facesToKeep.front = false;
    // right bottom front
    cubes[14].facesToKeep.back = false;
    cubes[14].facesToKeep.left = false;
    cubes[14].facesToKeep.top = false;
    // right middle back
    cubes[15].facesToKeep.top = false;
    cubes[15].facesToKeep.bottom = false;
    // right middle middle
    // right middle front
    cubes[16].facesToKeep.top = false;
    cubes[16].facesToKeep.bottom = false;
    // right top back
    cubes[17].facesToKeep.left = false;
    cubes[17].facesToKeep.bottom = false;
    cubes[17].facesToKeep.front = false;
    // right top middle
    cubes[18].facesToKeep.front = false;
    cubes[18].facesToKeep.back = false;
    // right top front
    cubes[19].facesToKeep.back = false;
    cubes[19].facesToKeep.left = false;
    cubes[19].facesToKeep.bottom = false;
    return cubes;
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

  function getVertNormsFromCube (cube) {
    if (cube.facesToKeep.front) pushFront(cube);
    if (cube.facesToKeep.right) pushRight(cube);
    if (cube.facesToKeep.top) pushTop(cube);
    if (cube.facesToKeep.left) pushLeft(cube);
    if (cube.facesToKeep.bottom) pushBottom(cube);
    if (cube.facesToKeep.back) pushBack(cube);
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
  const DEPTH = 4;
  var cube = new Cube(-1.0, 1.0, -1.0, 1.0, -1.0, 1.0);

  console.time('vertices');
  if (DEPTH < 1) {
    getVertNormsFromCube(cube);
  } else {
    var numCubes = Math.pow(20, DEPTH);
    var cubes = recursivelySubdivide(cube, DEPTH);
    for (var i = 0; i < numCubes; i += 4) {
      getVertNormsFromCube(cubes[i]);
      getVertNormsFromCube(cubes[i + 1]);
      getVertNormsFromCube(cubes[i + 2]);
      getVertNormsFromCube(cubes[i + 3]);
    }
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
