import { newRoom, popCard } from "./stack-manager"
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

    expect(result).toEqual({
      type: 'next',
      userCards: [],
      scores: [],
    })
  })
})
