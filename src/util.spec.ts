import { generateStacks } from './util'

describe('generateStacks', () => {
  it('should generate split card stack by 2', () => {
    const stack = generateStacks(2, false)
    expect(stack).toEqual([
      [
        52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36, 35,
        34, 33, 32, 31, 30, 29, 28, 27,
      ],
      [
        26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9,
        8, 7, 6, 5, 4, 3, 2, 1,
      ],
    ])
  })

  it('should generate split card stack by 3', () => {
    const stack = generateStacks(3, false)
    expect(stack).toEqual([
      [52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40, 39, 38, 37, 36],
      [35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19],
      [18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    ])
  })
})
