import * as roomModel from './model/room'
import { Card, RoomId } from './types'
import { generateStacks } from './util'

const ROOM_SIZE = 2

export type PopCardResult =
  | { type: 'next'; userCards: Card[]; scores: number[] }
  | { type: 'done'; scores: number[] }

export const newRoom = (id: RoomId) => {
  const stacks = generateStacks(ROOM_SIZE)
  roomModel.create(
    id,
    stacks.map((stack) => ({ stack, score: 0 }))
  )
}

export const popCardForRoom = (id: RoomId) => {
  const poppedCards = roomModel.popTopOfTheStack(id)

  if (poppedCards.length === ROOM_SIZE) {
    const winnerIdx = poppedCards.reduce(
      (maxIdx, card, idx) => (card > poppedCards[maxIdx] ? idx : maxIdx),
      0
    )
    roomModel.incrementScore(id, winnerIdx)
  }

  return poppedCards
}

export const popCard = (id: RoomId): PopCardResult => {
  const roomState = roomModel.get(id)

  const poppedCards = popCardForRoom(id)
  const scores = roomState.users.map((u) => u.score)

  if (poppedCards.length !== ROOM_SIZE) {
    return { type: 'done' as const, scores }
  }

  return { type: 'next' as const, userCards: poppedCards, scores }
}
