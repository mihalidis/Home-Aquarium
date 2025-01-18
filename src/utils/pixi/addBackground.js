import { Sprite } from 'pixi.js'

export function addBackground(app) {
  const background = Sprite.from('background')

  // Anchor'u 0'a set ederek sol üst köşeden başlatın
  background.anchor.set(0, 0)

  // Direkt olarak app.screen boyutlarını kullanın
  background.width = app.screen.width
  background.height = app.screen.height

  // Pozisyonu 0,0'a ayarlayın (sol üst köşe)
  background.x = 0
  background.y = 0

  app.stage.addChild(background)
}
