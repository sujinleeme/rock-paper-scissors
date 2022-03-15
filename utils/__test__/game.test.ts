import { Choice } from '@types'

import { getRandomChoice, getWinner } from '../'

describe(`# getWinner`, () => {
  it.each`
    p1                 | p2
    ${Choice.rock}     | ${Choice.rock}
    ${Choice.scissors} | ${Choice.rock}
    ${Choice.rock}     | ${Choice.scissors}
  `(
    `returns winner when p1 choice is $p1 and p2 choice is $p2`,
    ({ p1, p2 }) => {
      expect(getWinner(p1, p2)).toMatchSnapshot()
    }
  )
})

describe(`# getRandomChoice`, () => {
  it('should return number betweeon 1 to 3', () => {
    const choice = getRandomChoice()
    const isInRange = choice >= 1 && choice <= 3
    expect(isInRange).toBe(true)
  })
})
