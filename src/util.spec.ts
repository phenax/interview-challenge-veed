import { Card } from "./types"
import { generateStacks, shuffle, toCardScore } from "./util"

describe('cardScore', () => {
  it('should return card score', () => {
    expect(toCardScore([0, 0])).toEqual(0)
    expect(toCardScore([0, 1])).toEqual(1)
    expect(toCardScore([0, 12])).toEqual(12)
    expect(toCardScore([1, 6])).toEqual(19)
    expect(toCardScore([2, 12])).toEqual(38)
    expect(toCardScore([3, 12])).toEqual(51)
  })

  it('should generate unique card score for all cards in deck', () => {
    const allCards = Array.from({ length: 4 }).flatMap((_, i) => Array.from({ length: 13 }, (_, j) => [i, j] as Card))
    const cardScores = allCards.map(toCardScore)
    expect(cardScores).toEqual(Array.from({ length: 52 }, (_, i) => i))
  })
})

describe('generateStacks', () => {
  it('should generate split card stack', () => {
    const stack = generateStacks(2, false)
    expect(stack).toEqual([
      [
        [ 3, 12 ], [ 3, 11 ], [ 3, 10 ],
        [ 3, 9 ],  [ 3, 8 ],  [ 3, 7 ],
        [ 3, 6 ],  [ 3, 5 ],  [ 3, 4 ],
        [ 3, 3 ],  [ 3, 2 ],  [ 3, 1 ],
        [ 3, 0 ],  [ 2, 12 ], [ 2, 11 ],
        [ 2, 10 ], [ 2, 9 ],  [ 2, 8 ],
        [ 2, 7 ],  [ 2, 6 ],  [ 2, 5 ],
        [ 2, 4 ],  [ 2, 3 ],  [ 2, 2 ],
        [ 2, 1 ],  [ 2, 0 ]
      ],
      [
        [ 1, 12 ], [ 1, 11 ], [ 1, 10 ],
        [ 1, 9 ],  [ 1, 8 ],  [ 1, 7 ],
        [ 1, 6 ],  [ 1, 5 ],  [ 1, 4 ],
        [ 1, 3 ],  [ 1, 2 ],  [ 1, 1 ],
        [ 1, 0 ],  [ 0, 12 ], [ 0, 11 ],
        [ 0, 10 ], [ 0, 9 ],  [ 0, 8 ],
        [ 0, 7 ],  [ 0, 6 ],  [ 0, 5 ],
        [ 0, 4 ],  [ 0, 3 ],  [ 0, 2 ],
        [ 0, 1 ],  [ 0, 0 ]
      ]
    ])
  })
})

