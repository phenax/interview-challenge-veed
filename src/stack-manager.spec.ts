import { newRoom, popCard, popCardForRoom } from "./stack-manager"
import * as roomModel from './model/room'

describe('StackManager', () => {
  // beforeEach(() => {
  //   (roomModel.create as any).mockClear()
  // })

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
    newRoom('hello')

    const result = popCard('hello')
    expect(result.type).toBe('next')
    // expect(result.scores).toEqual([1, 0])
  })

  describe('popCardForRoom', () => {
    it('should pop the top of card stacks', () => {
      const room: roomModel.Room = {
        users: [
          { stack: [ [4, 0], [0, 12], [1, 13] ], score: 0 },
          { stack: [ [0, 0], [1, 0], [3, 2] ], score: 0 },
        ]
      }

      expect(popCardForRoom(room)).toEqual([ [1, 13], [3, 2] ])
      expect(room.users.map(u => u.score)).toEqual([ 0, 1 ])

      expect(popCardForRoom(room)).toEqual([ [0, 12], [1, 0] ])
      expect(room.users.map(u => u.score)).toEqual([ 0, 2 ])

      expect(popCardForRoom(room)).toEqual([ [4, 0], [0, 0] ])
      expect(room.users.map(u => u.score)).toEqual([ 1, 2 ])
    })
  })
})

