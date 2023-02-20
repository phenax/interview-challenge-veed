import { CardStack, RoomId, UserId } from "../types"

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

export const get = (id: RoomId) => rooms.get(id)
