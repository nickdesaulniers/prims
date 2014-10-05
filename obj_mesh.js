function ObjMesh (meshUrl, cb) {
  // http://www.html5rocks.com/en/tutorials/workers/basics/#toc-inlineworkers
  // When using these techniques to inline your worker code, importScripts()
  // will only work if you supply an absolute URI. If you attempt to pass a
  // relative URI, the browser will complain with a security error. The reason
  // being: the worker (now created from a blob URL) will be resolved with a
  // blob: prefix, while your app will be running from a different (presumably
  // http://) scheme. Hence, the failure will be due to cross origin
  // restrictions.
  var worker_src = "onmessage = function (e) {" +
    "console.log('worker', e.data);" +
    //"importScripts(e.data.url + '../wavefront-obj-parser.js');" +
    "importScripts(e.data.url + '../webgl-obj-loader/webgl-obj-loader.js');" +
    "var xhr = new XMLHttpRequest;" +
    "xhr.open('GET', e.data.url + e.data.mesh, false);" + // sync xhr!!
    "xhr.send();" +
    //"self.postMessage(new ObjMesh(xhr.response));" +
    "self.postMessage(new OBJ.Mesh(xhr.response));" +
    "self.close();" +
  "};"
  var blob = new Blob([worker_src], { type: 'text/javascript' });
  var url = URL.createObjectURL(blob);
  var worker = new Worker(url);
  URL.revokeObjectURL(url);
  worker.onmessage = function (e) {
    console.log('main thread received: ', e);
    //cb(e.data);
    cb({
      vertices: e.data.vertices,
      normals: e.data.vertexNormals,
      indices: e.data.indices,
    });
  };
  worker.postMessage({
    mesh: meshUrl,
    url: location.href.replace(/\/(?:\w+.)?\w+$/, '/')
  });
};

