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
   monkey,
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

     camera.position.set(0,0,5);
     scene.add(camera);

     var loader = new THREE.JSONLoader()

     loader.load('models/sittingBox.js', function( geometry, materials ) {
        var material = new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true
        });

        monkey = new THREE.Mesh(geometry, material);

        scene.add(monkey);
        render();
     });


     //Add the stats to the scene
     stats = new Stats();
     stats.setMode(0);

     stats.domElement.style.position =  'absolute';
     stats.domElement.style.left = '0px';
     stats.domElement.style.top = '0px';
     document.body.appendChild(stats.domElement);


   }

   function render(){
     renderer.render(scene, camera);
     requestAnimationFrame(render);

     monkey.rotation.y += 0.01

     stats.update();
   }

   window.onload = initScene;

   //Give out the scene object just for debugging purposes.
   return {
     scene: scene
   }

 })();
