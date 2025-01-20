import { setActivePinia, createPinia } from 'pinia'
import { useFishPondStore } from '../stores/fishPondStore'
import { describe, it, expect, beforeEach } from 'vitest'

describe('FishPondStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize with default values', () => {
    const store = useFishPondStore()
    expect(store.fishes).toEqual([])
    expect(store.isLoading).toBe(false)
  })

  it('should fetch pond fishes', async () => {
    const store = useFishPondStore()
    await store.fetchPondFishes()
    expect(store.isLoading).toBe(false)
    expect(store.fishes.length).toBeGreaterThan(0)
  })

  it('should update current time', () => {
    const store = useFishPondStore()
    const newTime = new Date('2023-10-01T12:00:00')
    store.updateTime(newTime)
    expect(store.currentTime).toEqual(newTime)
  })
})