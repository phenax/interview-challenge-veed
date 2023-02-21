import { createInterface } from 'node:readline/promises'
import { newRoom, popCard } from './stack-manager'
import { Card } from './types'

const rl = createInterface(process.stdin, process.stdout)

const main = async () => {
  const roomId = 'test-room'
  newRoom(roomId)

  const loop = async () => {
    const result = popCard(roomId)

    if (result.type === 'done') {
      const [scoreA, scoreB] = result.scores
      console.log('Final Score:', result.scores.join(' - '))

      if (scoreA > scoreB) {
        console.log('User 1 won!')
      } else if (scoreA < scoreB) {
        console.log('User 2 won!')
      } else {
        console.log('Its a tie!')
      }
      return
    }

    const [cardA, cardB] = result.userCards
    printCards(cardA, cardB)

    console.log('Score:', result.scores.join(' - '))

    console.log()
    await rl.question('')
    await loop()
  }

  await loop()
}

const printCards = (cardA: Card, cardB: Card) => {
  console.log('┌──────┐ ┌──────┐')
  console.log('│      │ │      │')
  console.log(
    '│ ',
    `${cardA}`.padStart(2, ' '),
    ' │ │ ',
    `${cardB}`.padStart(2, ' '),
    ' │'
  )
  console.log('│      │ │      │')
  console.log('└──────┘ └──────┘')
}

main()
  .finally(() => rl.close())
  .catch((e) => (console.error(e), process.exit(1)))
