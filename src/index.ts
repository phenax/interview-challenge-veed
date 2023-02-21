import { createInterface } from "node:readline/promises"
import { newRoom, popCard } from "./stack-manager"

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

    console.log('-------- --------')
    console.log('|      | |      |')
    console.log('| ', result.userCards.map(value => `${value}`.padStart(2, ' ')).join('  | |  '), ' |')
    console.log('|      | |      |')
    console.log('-------- --------')

    console.log('Score:', result.scores.join(' - '))

    console.log()
    await rl.question('')
    await loop()
  }

  await loop()
}

main()
  .finally(() => rl.close())
  .catch(e => (console.error(e), process.exit(1)))
