import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// initialize the scene
const scene = new THREE.Scene()
// texture loader
const textureLoader = new THREE.TextureLoader()
// load the textures
const sunTexture = textureLoader.load('/textures/sun.jpg')
const sunNormal = textureLoader.load('/textures/SunNormal.png')
const mercuryTexture = textureLoader.load('/textures/mercury.jpg')
const venusTexture = textureLoader.load('/textures/venus.jpg')
const earthTexture = textureLoader.load('/textures/earth.jpg')
const moonTexture = textureLoader.load('/textures/moon.jpg')
const marsTexture = textureLoader.load('/textures/mars.jpg')
// mars moons
const phobosTexture = textureLoader.load('/textures/ceres.jpg')
const deimosTexture = textureLoader.load('/textures/eris.jpg')
const jupiterTexture = textureLoader.load('/textures/jupiter.jpg')
// jupiter moons
const ioTexture = textureLoader.load('/textures/haumea.jpg')
const europaTexture = textureLoader.load('/textures/ceres.jpg')
const ganymedeTexture = textureLoader.load('/textures/makemake.jpg')
const callistoTexture = textureLoader.load('/textures/eris.jpg')

const saturnTexture = textureLoader.load('/textures/saturn.jpg')
// saturn ring
const saturnRingTexture = textureLoader.load('/textures/saturnRing.png')

const uranusTexture = textureLoader.load('/textures/uranus.jpg')
const neptuneTexture = textureLoader.load('/textures/neptune.jpg')

// Load HDRI loader (environment map - cubeTextureLoader)
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentCubeMap = cubeTextureLoader.setPath( '/textures/environmentMaps/MilkyWay/' )
.load([
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
])
// set the environment map to the scene
scene.background = environmentCubeMap

// creating a json like object to store the planets and their textures
const planets = [{
  name: 'mercury',
  texture: mercuryTexture,
  radius: 0.5,
  distance: 12,
  speed: 0.05
  },
  {
  name: 'venus',
  texture: venusTexture,
  radius: 1,
  distance: 16,
  speed: -0.025
  },
  {
  name: 'earth',
  texture: earthTexture,
  radius: 1,
  distance: 23,
  speed: 0.015,
  moons: [{
    name: 'moon',
    texture: moonTexture,
    radius: 0.5,
    distance: 2, // reduced distance of moon
    speed: 0.03,
    distanceY: 0.1
  }]
  },
  {
  name: 'mars',
  texture: marsTexture,
  radius: 0.8,
  distance: 32,
  speed: 0.01,
  moons: [{
    name: 'phobos',
    texture: phobosTexture,
    radius: 0.2,
    distance: 1, // reduced distance of moon
    speed: 0.005,
    distanceY: 0.3
  },
  {
    name: 'deimos',
    texture: deimosTexture,
    radius: 0.2,
    distance: 1.1, // reduced distance of moon
    speed: 0.01,
    distanceY: -0.2
  }]
  },
  {
  name: 'jupiter',
  texture: jupiterTexture,
  radius: 4,
  distance: 55,
  speed: 0.005,
  moons: [{
    name: 'io',
    texture: ioTexture,
    radius: 0.2,
    distance: 1.5, // reduced distance of moon
    speed: 0.01,
    distanceY: 0.3
  },
  {
    name: 'europa',
    texture: europaTexture,
    radius: 0.2,
    distance: 1.8, // reduced distance of moon
    speed: 0.015,
    distanceY: -0.4
  },
  {
    name: 'ganymede',
    texture: ganymedeTexture,
    radius: 0.2,
    distance: 2.5, // reduced distance of moon
    speed: 0.02,
    distanceY: 0.3
  },
  {
    name: 'callisto',
    texture: callistoTexture,
    radius: 0.2,
    distance: 2.8, // reduced distance of moon
    speed: 0.025,
    distanceY: -0.3
  }]
  },
  {
  name: 'saturn',
  texture: saturnTexture,
  radius: 2,
  distance: 80,
  speed: 0.004,
  ring: {
    texture: saturnRingTexture,
    innerRadius: 1.5,
    outerRadius: 1.8
  }
  },
  {
  name: 'uranus',
  texture: uranusTexture,
  radius: 2,
  distance: 90,
  speed: -0.008
  },
  {
  name: 'neptune',
  texture: neptuneTexture,
  radius: 2,
  distance: 100,
  speed: 0.006
  }]

// create a sphere geometry
const sphereGeometry = new THREE.SphereGeometry(1,32,32)

// create a sun 
const sunMaterial = new THREE.MeshPhysicalMaterial({
  map: sunTexture,
  color: 'red',
  emissive: 'orange',
  emissiveMap: sunTexture
})
sunMaterial.normalMap = sunNormal
const sunMesh = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
)
sunMesh.scale.setScalar(8)
scene.add(sunMesh)

// add point light in sun
const sunLight = new THREE.PointLight(0xffecd4, 4000, 200)
scene.add(sunLight)

// add light to the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
scene.add(ambientLight)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  1000)
camera.position.z = 100

// planet maker function
function createPlanet(planet){
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshPhysicalMaterial({map: planet.texture})
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}

// moon maker function
function createMoon(moon){
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshPhysicalMaterial({map: moon.texture})
  )
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x = moon.distance
  moonMesh.position.y = moon.distanceY
  return moonMesh
}

// generate mesh for each planet
const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet( planet )
  scene.add(planetMesh)
  if(planet.moons){
    planet.moons.forEach(moon => {
      const moonMesh = createMoon(moon)
      planetMesh.add(moonMesh)
    })
  }
  // for saturn
  if(planet.ring){
    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(planet.ring.innerRadius, planet.ring.outerRadius, 32),
      new THREE.MeshPhysicalMaterial({map: planet.ring.texture, side: THREE.DoubleSide})
    )
    ringMesh.rotation.x = Math.PI / 4

    planetMesh.add(ringMesh)
  }
  return planetMesh
})

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // fix the antialiasing issue
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// initialize the controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

// adding event listener to read resize event so that the canvas and camera can be resized without refreshing the page in renderloop
window.addEventListener('resize', () => {
  // resize the canvas
  renderer.setSize(window.innerWidth, window.innerHeight)

  // resize the camera aspect ratio
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
})


// renderloop setup
function renderLoop(){
  // update the controls
  controls.update()
  // rotating planets and moons on axis and revolving from the planetMeshes array
  planetMeshes.forEach((planetMesh, index) => {
    planetMesh.rotation.y += planets[index].speed
    planetMesh.position.x = planets[index].distance * Math.sin(planetMesh.rotation.y)
    planetMesh.position.z = planets[index].distance * Math.cos(planetMesh.rotation.y)
    if(planets[index].moons){
      planetMesh.children.forEach((moonMesh, moonIndex) => {
        moonMesh.rotation.y += planets[index].moons[moonIndex].speed
        moonMesh.position.z = planets[index].moons[moonIndex].distance * Math.cos(moonMesh.rotation.y)
        moonMesh.position.x = planets[index].moons[moonIndex].distance * Math.sin(moonMesh.rotation.y)
      })
    }
    // for ring
    if(planets[index].ring){
      planetMesh.children[0].rotation.z += 0.01
    }
  })

  // rotate the sun
  sunMesh.rotation.y += 0.001
  renderer.render(scene, camera)
  // checks the refresh rate of the screen
  requestAnimationFrame(renderLoop)
}
renderLoop()
