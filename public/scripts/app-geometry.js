/**
 * Summary
 * All three.js applications contain a renderer, scene, camera & light
 * common issues: it's behind u, there is no light to see it, scale it up dude
**/

var example = (function() {
  "use strict";

  var scene = new THREE.Scene(),
  renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),//Checks if the browser supports WebGLrendering.
  light = new THREE.AmbientLight(0xffffff),
  camera,
  manualGeometry,
  stats;

  function initScene(){
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(light);

    /**
    * Only objects between the near and far plane will be rendered
    * This has some advantages when u are looking at performance.
    **/
    camera = new THREE.PerspectiveCamera(
      35, //FOV simular to lence of camera (it's in degrees 35-45 is ok)
      window.innerWidth / window.innerHeight, // Aspect ratio, with/height
      1, //Near plane
      1000 //Far plane
    );

    camera.position.z = 5;
    scene.add(camera);


    //Creating a shape from scratch
    var material = new THREE.MeshBasicMaterial({
      vertexColors: THREE.VertexColors,
      side: THREE.DoubleSide
    });

    //Remember lesson about faces and vertices plz.
    var triangleGeometry = new THREE.Geometry();
    triangleGeometry.vertices.push(new THREE.Vector3(0.0, 1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(-1.0, -1.0, 0.0));
    triangleGeometry.vertices.push(new THREE.Vector3(1.0, -1.0, 0.0))

    triangleGeometry.faces.push(new THREE.Face3(0,1,2));

    triangleGeometry.faces[0].vertexColors[0] = new THREE.Color(0xFF0000);
    triangleGeometry.faces[0].vertexColors[1] = new THREE.Color(0x00FF00);
    triangleGeometry.faces[0].vertexColors[2] = new THREE.Color(0xFF0000);

    manualGeometry = new THREE.Mesh(triangleGeometry, material);

    scene.add(manualGeometry);

    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position =  'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);


    render();
  }

  function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);

    stats.update();
  }

  window.onload = initScene;

  //Give out the scene object just for debugging purposes.
  return {
    scene: scene
  }

})();
