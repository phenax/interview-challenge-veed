import * as roomModel from './model/room'
import { CardStack, RoomId } from './types'

const generateStacks = (split = 2) => {
  const cards = Array.from({ length: 4 }).flatMap((_, i) =>
    Array.from({ length: 13 }).map((_, j) => [i, j] as const))

  // TODO: shuffle

  const size = cards.length / split
  return cards.reduce((stacks: CardStack[], card, index): CardStack[] => {
    if (index % size < 1) {
      return [[card], ...stacks]
    }

    const [first, ...rest] = stacks
    return [[card, ...first], ...rest]
  }, [])
}

const ROOM_SIZE = 2

export const newRoom = (id: RoomId) => {
  const stacks = generateStacks(ROOM_SIZE)
  roomModel.create(id, stacks.map(stack => ({ stack, score: 0 })))
}

export const popCard = (id: RoomId) => {
  const roomState = roomModel.get(id)
  if (!roomState) throw new Error('Invalid room id')

  const poppedCards = roomModel.popCardStack(id)
  const scores = roomState.users.map(u => u.score)

  // TODO: score increment

  if (poppedCards.length < ROOM_SIZE) {
    return { type: 'done' as const, scores }
  }

  return { type: 'next' as const, userCards: poppedCards, scores }
}

