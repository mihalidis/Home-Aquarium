import { Application, Assets } from 'pixi.js'
import { addBackground } from './addBackground'
import { addDisplacementEffect } from './addDisplacementEffect'
import { addWaterOverlay, animateWaterOverlay } from './addWaterOverlay'
import { addFishes, animateFishes } from './addFishes'
import { sound } from '@pixi/sound'

import backgroundImage from '/images/inside-pond.png'
import aquariumSound from '/audio/aquarium-sound.mp3'
import defaultFishImage from '/images/default_fish.png'

const app = new Application()
const fishList = []

async function setup() {
  const pondContainer = document.querySelector('.pond-scene')
  // Container boyutlarını al
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

  pondContainer.textContent = ''
  pondContainer.appendChild(app.canvas)
}

async function preload(store) {
  const { imageAddedFishes } = store

  const assets = [
    { alias: 'background', src: backgroundImage },
    { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
    {
      alias: 'displacement',
      src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png',
    },
    { alias: 'waterAmbience', src: aquariumSound },
  ]

  const fishAssets = imageAddedFishes.map((fish, index) => ({
    alias: `fish${index + 1}`,
    src: index > 4 ? defaultFishImage : fish.image,
  }))

  assets.push(...fishAssets)

  await Assets.load(assets)
}

export async function fishPond(store) {
  await setup()
  await preload(store)

  sound.play('waterAmbience', {
    loop: true,
    volume: 0.4,
  })

  addBackground(app)
  addFishes(app, fishList)
  addWaterOverlay(app)
  addDisplacementEffect(app)

  app.ticker.add((time) => {
    animateFishes(app, fishList, time)
    animateWaterOverlay(app, time)
  })
}
