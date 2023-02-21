import { Card, CardStack } from "./types"

export const shuffle = (ls: any[]) =>
  ls.reduce((result, _, idx) => {
    const rIdx = Math.floor(ls.length * Math.random())
    const oldItem = result[idx]
    result[idx] = result[rIdx]
    result[rIdx] = oldItem
    return result
  }, [...ls])

export const generateStacks = (split = 2, shouldShuffle = true): CardStack[] => {
  let cards: Card[] = Array.from({ length: 52 }, (_, i) => i + 1)

  // Shuffle
  if (shouldShuffle)
    cards = shuffle(cards)

  const size = cards.length / split
  return cards.reduce((stacks: CardStack[], card, index): CardStack[] => {
    if (index % size < 1) {
      return [[card], ...stacks]
    }

    const [first, ...rest] = stacks
    return [[card, ...first], ...rest]
  }, [])
}

