import { Container, Sprite } from 'pixi.js'

export function addFishes(app, fishes) {
  const fishContainer = new Container()
  app.stage.addChild(fishContainer)

  const fishCount = 5
  const fishAssets = ['fish1', 'fish2', 'fish3', 'fish4', 'fish5']

  for (let i = 0; i < fishCount; i++) {
    const fishAsset = fishAssets[i % fishAssets.length]
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

  // for (let i = 0; i < fishCount; i++) {
  //     const fishAsset = fishAssets[i % fishAssets.length];
  //     const fish = Sprite.from(fishAsset);
  //     fish.anchor.set(0.5);

  //     const isHorizontal = Math.random() > 0.5;
  //     fish.speedX = isHorizontal ? (Math.random() > 0.5 ? 0.2 : -0.2) : 0;
  //     fish.speedY = !isHorizontal ? (Math.random() > 0.5 ? 0.2 : -0.2) : 0;

  //     fish.x = Math.random() * (app.screen.width - 100) + 50;
  //     fish.y = Math.random() * (app.screen.height - 100) + 50;

  //     fish.scale.set(0.5);

  //     if (fish.speedX < 0) {
  //         fish.scale.x *= -1;
  //     }

  //     fishContainer.addChild(fish);
  //     fishes.push(fish);
  // }
}

export function animateFishes(app, fishes) {
  const padding = 50

  fishes.forEach((fish) => {
    let newX = fish.x + fish.speedX
    let newY = fish.y + fish.speedY

    if (newX < padding || newX > app.screen.width - padding) {
      fish.speedX *= -1
      fish.scale.x *= -1
    }

    if (newY < padding || newY > app.screen.height - padding) {
      fish.speedY *= -1
    }

    fish.x += fish.speedX
    fish.y += fish.speedY
  })
}
