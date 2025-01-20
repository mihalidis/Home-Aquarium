import { Container, Sprite } from 'pixi.js'
import { TIME_SPEEDS } from '@/constants/enum'
import eventBus from '@/utils/eventBus'

export function addFishes(app, fishes, formattedFishes) {
  const fishContainer = new Container()
  app.stage.addChild(fishContainer)

  const fishAssets = formattedFishes.map(fish => `fish${fish.id}`)

  for (let i = 0; i < formattedFishes.length; i++) {
    const fishAsset = fishAssets[i]
    const fish = Sprite.from(fishAsset)
    fish.anchor.set(0.5)

    fish.eventMode = 'static'
    fish.cursor = 'pointer'

    const isHorizontal = Math.random() > 0.5
    fish.speedX = isHorizontal ? (Math.random() > 0.5 ? 0.2 : -0.2) : 0
    fish.speedY = !isHorizontal ? (Math.random() > 0.5 ? 0.2 : -0.2) : 0

    fish.originalSpeedX = fish.speedX
    fish.originalSpeedY = fish.speedY

    fish.on('mouseover', () => {
      fish.speedX = 0
      fish.speedY = 0
      const fishPosition = {
        top: fish.y,
        left: fish.x,
      }
      eventBus.emit('SHOW_TOOL_TIP', {fish: formattedFishes[i], fishPosition})
    })

    fish.on('mouseout', () => {
      fish.speedX = fish.originalSpeedX
      fish.speedY = fish.originalSpeedY
    })

    fish.x = Math.random() * (app.screen.width - 100) + 50
    fish.y = Math.random() * (app.screen.height - 100) + 50
    fish.scale.set(0.5)

    if (fish.speedX < 0) {
      fish.scale.x *= -1
    }

    fishContainer.addChild(fish)
    fishes.push(fish)
  }
}

export function animateFishes(app, fishes, time) {
  const padding = 50
  const speedDividers = {
    [TIME_SPEEDS.REAL_TIME]: 1,
    [TIME_SPEEDS.MINUTE_SPEED]: 2,
    [TIME_SPEEDS.TWO_MINUTE_SPEED]: 2,
    [TIME_SPEEDS.HOUR_SPEED]: 30,
  }

  const speedDivider = speedDividers[time.speed] || 1
  const adjustedSpeed = time.speed / speedDivider

  fishes.forEach((fish) => {
    let newX = fish.x + fish.speedX * adjustedSpeed
    let newY = fish.y + fish.speedY * adjustedSpeed

    if (newX < padding || newX > app.screen.width - padding) {
      fish.speedX *= -1
      fish.scale.x *= -1
    }

    if (newY < padding || newY > app.screen.height - padding) {
      fish.speedY *= -1
    }

    fish.x += fish.speedX * adjustedSpeed
    fish.y += fish.speedY * adjustedSpeed
  })
}
