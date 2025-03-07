export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function isInRange(value, min, max) {
  return value >= min && value <= max
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
} 