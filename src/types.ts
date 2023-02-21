export type UserId = string

export type CardFace = 0 | 1 | 2 | 3 // 0: clubs, 1: diamonds, 2: hearts, 3: spades

export type Card = readonly [CardFace, number]

export type RoomId = string

export type CardStack = Card[]

