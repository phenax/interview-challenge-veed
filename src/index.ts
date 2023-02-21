import { createInterface } from 'node:readline/promises'
import { zip } from 'ramda'
import { newRoom, popCard, PopCardResult } from './stack-manager'
import { showHighlightBox, showSimpleBox } from './util'

const rl = createInterface(process.stdin, process.stdout)

const main = async () => {
  const roomId = 'test-room'
  newRoom(roomId)

  const loop = async () => {
    const result = popCard(roomId)

    if (result.type === 'done') {
      showWinnerScore(result)
      return
    }

    showCards(result)
    console.log('Score:', result.scores.join(' - '))

    console.log()
    await rl.question('Press enter to continue: ')
    console.log()
    await loop()
  }

  await loop()
}

const showWinnerScore = (result: PopCardResult & { type: 'done' }) => {
  const [scoreA, scoreB] = result.scores
  console.log('Final Score:', result.scores.join(' - '))

  process.stdout.write('\n\x1b[1m\x1b[1m=== ')
  if (scoreA > scoreB) {
    process.stdout.write('User 1 won!')
  } else if (scoreA < scoreB) {
    process.stdout.write('User 2 won!')
  } else {
    process.stdout.write('Its a tie!')
  }
  process.stdout.write(' === \x1b[0m\n')
  console.log()
}

const showCards = (result: PopCardResult & { type: 'next' }) => {
  const [cardA, cardB] = result.userCards
  const draw = (leftWon: boolean) => {
    const boxes = leftWon
      ? zip(showHighlightBox(cardA), showSimpleBox(cardB))
      : zip(showSimpleBox(cardA), showHighlightBox(cardB))
    console.log(boxes.map((p) => p.join(' ')).join('\n'))
  }
  draw(cardA > cardB)
}

main()
  .finally(() => rl.close())
  .catch((e) => (console.error(e), process.exit(1)))
