# Prims
3D Geometry Primitives for WebGL

Constructors return objects with the keys `vertices`, `indices`, and `normals`.  Working on adding `uvs`.  Indices should be put into at least a `Uint16Array` since the number of unique vertices will be greater than 255 (`Uint8Array`) for most geometries.  The goal is to be able to have a bunch of 3D Geometries without needing all of Three.js.

All vertice lists use hard shading for polyhedra (so each vertex is duplicated for each face).

Also contains a few meshes.  These must be loaded aync.

![Hard vs Soft Shading](images/hard_vs_soft_shading.png)

## Examples
### Tetrahedron
4 sides

![Tetrahedron](images/tetrahedron.png)

### Cube
6 sides

![Cube](images/cube.png)

### Octahedron
8 sides

![Octahedron](images/octahedron.png)

### Dodecahedron
12 sides

![Dodecahedron](images/dodecahedron.png)

### Icosahedron
20 sides

![Icosahedron](images/icosahedron.png)

### Cylinder
![Cylinder](images/cylinder.png)

### Cone
![Cone](images/cone.png)

### Sphere
![Sphere](images/sphere.png)

### Torus
![Torus](images/torus.png)

### Sierpinski Triangle
![Sierpinski Triagle](images/sierpinski.png)

### Menger Sponge
![Menger Sponge](images/sponge.png)

## Meshes
### Suzanne
![Suzanne](images/suzanne.png)

### Utah Teapot
![Utah Teapot](images/teapot.png)

### Stanford Bunny
![Stanford Bunny](images/bunny.png)

### Stanford Dragon
![Stanford Dragon](images/dragon.png)

## License
"THE BEER-WARE LICENSE" (Revision 42):
<nick@mozilla.com> wrote this file. As long as you retain this notice you can do whatever you want with this stuff. If we meet some day, and you think this stuff is worth it, you can buy me a beer in return.

Nick Desaulniers

