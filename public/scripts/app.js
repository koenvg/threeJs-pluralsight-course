var example = (function() {
  "use strict";

  var scene = new THREE.Scene(),
  renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),//Checks if the browser supports WebGLrendering.
  light = new THREE.AmbientLight(0xffffff),
  camera,
  box;

  function initScene(){
    renderer.setSize( window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(light);

    /**
    * Only objects between the near and far plane will be rendered
    * This has some advantages when u are looking at performance.
    **/
    camera = new THREE.PerspectiveCamera(
      32, //FOV simular to lence of camera (it's in degrees 35-45 is ok)
      window.innerWidth / window.innerHeight, // Aspect ratio, with/height
      1, //Near plane
      1000 //Far plane
    );

    camera.position.z = 100;
    scene.add(camera);

    box = new THREE.Mesh(
      new THREE.BoxGeometry(20,20,20),
      new THREE.MeshBasicMaterial({color: 0xFF0000})
    );

    box.name = "box";

    scene.add(box);

    render();
  }

  function render(){
    box.rotation.y += 0.01;
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  //Give out the scene object just for debugging purposes.
  return {
    scene: scene
  }

})();
