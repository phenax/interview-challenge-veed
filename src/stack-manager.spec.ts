import { newRoom, popCard, popCardForRoom } from "./stack-manager"
import * as roomModel from './model/room'

describe('StackManager', () => {
  it('should create a new room', () => {
    newRoom('hello')

    const room = roomModel.get('hello')

    expect(room?.users.length).toBe(2)
    expect(room?.users[0].score).toBe(0)
    expect(room?.users[1].score).toBe(0)
    expect(room?.users[0].stack.length).toBe(26)
    expect(room?.users[1].stack.length).toBe(26)
  })

  it('should pop a card from stack', () => {
    roomModel.create('hello', [ { stack: [10, 3, 39], score: 0 }, { stack: [41, 52, 22], score: 0 } ])

    expect(popCard('hello')).toEqual({ type: 'next', scores: [1, 0], userCards: [ 39, 22 ] })
    expect(popCard('hello')).toEqual({ type: 'next', scores: [1, 1], userCards: [ 3, 52 ] })
    expect(popCard('hello')).toEqual({ type: 'next', scores: [1, 2], userCards: [ 10, 41 ] })
    expect(popCard('hello')).toEqual({ type: 'done', scores: [1, 2] })
  })

  describe('popCardForRoom', () => {
    it('should pop the top of card stacks', () => {
      roomModel.create('hello', [
        { stack: [ 10, 3, 39 ], score: 0 },
        { stack: [ 41, 52, 22 ], score: 0 },
      ])

      expect(popCardForRoom('hello')).toEqual([ 39, 22 ])
      expect(roomModel.get('hello').users.map(u => u.score)).toEqual([ 1, 0 ])

      expect(popCardForRoom('hello')).toEqual([ 3, 52 ])
      expect(roomModel.get('hello').users.map(u => u.score)).toEqual([ 1, 1 ])

      expect(popCardForRoom('hello')).toEqual([ 10, 41 ])
      expect(roomModel.get('hello').users.map(u => u.score)).toEqual([ 1, 2 ])

      // Done
      expect(popCardForRoom('hello')).toEqual([])
      expect(roomModel.get('hello').users.map(u => u.score)).toEqual([ 1, 2 ])
    })
  })
})

