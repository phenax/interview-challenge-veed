import { createInterface } from 'node:readline/promises'
import { zip } from 'ramda'
import { newRoom, popCard } from './stack-manager'

const rl = createInterface(process.stdin, process.stdout)

const main = async () => {
  const roomId = 'test-room'
  newRoom(roomId)

  const loop = async () => {
    const result = popCard(roomId)

    if (result.type === 'done') {
      const [scoreA, scoreB] = result.scores
      console.log('Final Score:', result.scores.join(' - '))

      process.stdout.write('\x1b[1m\x1b[1m=== ')
      if (scoreA > scoreB) {
        process.stdout.write('User 1 won!')
      } else if (scoreA < scoreB) {
        process.stdout.write('User 2 won!')
      } else {
        process.stdout.write('Its a tie!')
      }
      process.stdout.write(' === \x1b[0m\n')
      return
    }

    const [cardA, cardB] = result.userCards
    const drawCards = (leftWon: boolean) => {
      const boxes = leftWon ? zip(highlightBox(cardA), simpleBox(cardB)) 
       : zip(simpleBox(cardA), highlightBox(cardB))
      console.log(boxes.map(p => p.join(' ')).join('\n'))
    }
    drawCards(cardA > cardB)

    console.log('Score:', result.scores.join(' - '))

    console.log()
    await rl.question('')
    await loop()
  }

  await loop()
}

const simpleBox = (value: any) => [
  '┌──────┐',
  '│      │',
  `│  ${`${value}`.padStart(2, ' ')}  │`,
  '│      │',
  '└──────┘',
]

const highlightBox = (value: any) => [
  '╔══════╗',
  '║      ║',
  `║  ${`${value}`.padStart(2, ' ')}  ║`,
  '║      ║',
  '╚══════╝',
].map(l => `\x1b[1m\x1b[35m${l}\x1b[0m`)

main()
  .finally(() => rl.close())
  .catch((e) => (console.error(e), process.exit(1)))
