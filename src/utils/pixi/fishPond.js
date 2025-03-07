import { Application, Assets } from 'pixi.js'
import { addBackground } from './addBackground'
import { addDisplacementEffect } from './addDisplacementEffect'
import { addWaterOverlay, animateWaterOverlay } from './addWaterOverlay'
import { addFishes, animateFishes } from './addFishes'
import { sound } from '@pixi/sound'

const app = new Application()
const fishList = []

async function setup() {
  const pondContainer = document.querySelector('.pond-scene')
  const width = pondContainer.clientWidth
  const height = pondContainer.clientHeight

  await app.init({
    background: '#1099bb',
    borderRadius: '18px',
    width,
    height,
    autoDensity: true,
    resolution: window.devicePixelRatio,
  })

  app.canvas.style.borderRadius = '12px'
  pondContainer.appendChild(app.canvas)
}

async function preload(store) {
  const { formattedFishes } = store

  const assets = [
    { alias: 'background', src: '/assets/pixi/inside-pond.png' },
    { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
    {
      alias: 'displacement',
      src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png',
    },
    { alias: 'waterAmbience', src: '/assets/pixi/aquarium-sound.mp3' },
  ]

  const fishAssets = formattedFishes.map((fish, index) => {
    let imagePath;
    if (index > 4) {
      imagePath = '/assets/pixi/default_fish.png';
    } else if (fish.id === 1) {
      imagePath = '/assets/pixi/fish1.png';
    } else {
      imagePath = `/assets/pixi/Fish${fish.id}.png`;
    }
    
    return {
      alias: `fish${index + 1}`,
      src: imagePath,
    };
  })

  assets.push(...fishAssets)

  await Assets.load(assets)
}

export async function createFishPond(store) {
  await setup()
  await preload(store)

  sound.play('waterAmbience', {
    loop: true,
    volume: 0.08,
  })

  addBackground(app)
  addFishes(app, fishList, store.formattedFishes)
  addWaterOverlay(app)
  addDisplacementEffect(app)

  app.ticker.add((time) => {
    time.speed = store.currentSpeed
    animateFishes(app, fishList, time, store.formattedFishes)
    animateWaterOverlay(app, time)
  })
}
