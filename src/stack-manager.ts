import * as roomModel from './model/room'
import { Card, CardStack, RoomId } from './types'

export const toCardScore = ([shape, value]: Card) => shape * 13 + value

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

export const popCardForRoom = (room: roomModel.Room) => {
  // TODO: stack mutation
  const poppedCards = room.users.map(u => u.stack.pop()).filter(c => c) as Card[] ?? []

  const maxCardScore = Math.max(...poppedCards.map(c => c ? toCardScore(c) : 0))
  const scoreIncrements = poppedCards.map(card => toCardScore(card) === maxCardScore ? 1 : 0)

  // TODO: score mutation
  room.users = room.users.map((u, index) => ({ ...u, score: scoreIncrements[index] + u.score }))

  return poppedCards
}

export const popCard = (id: RoomId) => {
  const roomState = roomModel.get(id)
  if (!roomState) throw new Error('Invalid room id')

  const poppedCards = popCardForRoom(roomState)
  const scores = roomState.users.map(u => u.score)

  if (poppedCards.length < ROOM_SIZE) {
    return { type: 'done' as const, scores }
  }

  return { type: 'next' as const, userCards: poppedCards, scores }
}

