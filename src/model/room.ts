import { Card, CardStack, RoomId } from '../types'

export interface User {
  stack: CardStack
  score: number
}

export interface Room {
  users: User[]
}

const rooms: Map<RoomId, Room> = new Map()

export const create = (id: RoomId, users: User[]) => {
  rooms.set(id, { users })
}

export const get = (id: RoomId): Room => {
  const room = rooms.get(id)
  if (!room) throw new Error(`Invalid room: ${id}`)
  return room
}

export const popTopOfTheStack = (id: RoomId): Card[] => {
  const room = get(id)
  return (room.users.map((u) => u.stack.pop()).filter((c) => c) as Card[]) ?? []
}

export const incrementScore = (id: RoomId, userIdx: number) => {
  const room = get(id)
  room.users = room.users.map((u, index) =>
    userIdx === index ? { ...u, score: u.score + 1 } : u
  )
}
