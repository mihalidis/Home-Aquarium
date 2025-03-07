import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Create a mock instance
const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });

// Mock data for fishes
const mockFishes = [
  {
    id: 1,
    type: "Goldfish",
    name: "Goldy",
    weight: 100, // gram
    feedingSchedule: {
      lastFeed: "09:00",
      intervalInHours: 6
    }
  },
  {
    id: 2,
    type: "Betta",
    name: "Fighter",
    weight: 80, // gram
    feedingSchedule: {
      lastFeed: "08:30", 
      intervalInHours: 8
    }
  },
  {
    id: 3,
    type: "Guppy",
    name: "Rainbow",
    weight: 30, // gram
    feedingSchedule: {
      lastFeed: "10:00",
      intervalInHours: 4
    }
  },
  {
    id: 4,
    type: "Angelfish",
    name: "Angel",
    weight: 120, // gram
    feedingSchedule: {
      lastFeed: "07:45",
      intervalInHours: 5
    }
  },
  {
    id: 5,
    type: "Tetra",
    name: "Neon",
    weight: 25, // gram
    feedingSchedule: {
      lastFeed: "11:15",
      intervalInHours: 4
    }
  }
];

mock.onGet('https://run.mocky.io/v3/fish-pond').reply(200, mockFishes);

export const fetchFishes = () => axios.get('https://run.mocky.io/v3/fish-pond')
