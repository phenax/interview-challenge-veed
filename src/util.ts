import { splitEvery } from 'ramda'
import { Card, CardStack } from './types'

export const shuffle = (ls: any[]) =>
  ls.reduce(
    (result, _, idx) => {
      const rIdx = Math.floor(ls.length * Math.random())
      const oldItem = result[idx]
      result[idx] = result[rIdx]
      result[rIdx] = oldItem
      return result
    },
    [...ls]
  )

export const generateStacks = (
  split = 2,
  shouldShuffle = true
): CardStack[] => {
  let cards: Card[] = Array.from({ length: 52 }, (_, i) => i + 1)

  // Shuffle
  if (shouldShuffle) cards = shuffle(cards)

  const size = cards.length / split
  return splitEvery(size, cards)
}

export const showSimpleBox = (value: any) => [
  '┌──────┐',
  '│      │',
  `│  ${`${value}`.padStart(2, ' ')}  │`,
  '│      │',
  '└──────┘',
]

export const showHighlightBox = (value: any) =>
  [
    '╔══════╗',
    '║      ║',
    `║  ${`${value}`.padStart(2, ' ')}  ║`,
    '║      ║',
    '╚══════╝',
  ].map((l) => `\x1b[1m\x1b[35m${l}\x1b[0m`)
