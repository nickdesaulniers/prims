#Prims
3D Geometry Primitives for WebGL

Based on [FreeGLUT](http://freeglut.sourceforge.net/docs/api.php#GeometricObject).

Constructors return objects with the keys `vertices`, `indices`, and `normals`.  Working on adding `uvs`.  Indices should be put into at least a `Uint16Array` since the number of unique vertices will be greater than 255 (`Uint8Array`) for most geometries.  The goal is to be able to have a bunch of 3D Geometries without needing all of Three.js.

##Examples

###Cube
![Cube](images/cube.png)

###Sphere
![Sphere](images/sphere.png)

###Torus
![Torus](images/torus.png)

###Octahedron
![Octahedron](images/octahedron.png)

##License
"THE BEER-WARE LICENSE" (Revision 42):
<nick@mozilla.com> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

Nick Desaulniers
