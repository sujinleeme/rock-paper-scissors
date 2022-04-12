import { Choice, Winner } from '@types'

import { getFrequent, getRandomChoice, getWinner } from '..'

describe(`# getWinner`, () => {
  it.each`
    p1                 | p2                 | expected
    ${Choice.rock}     | ${Choice.rock}     | ${Winner.draw}
    ${Choice.scissors} | ${Choice.rock}     | ${Winner.p1}
    ${Choice.rock}     | ${Choice.scissors} | ${Winner.p2}
  `(
    `shound sreturns $expected when p1 choice is $p1 and p2 choice is $p2`,
    ({ p1, p2 }) => {
      expect(getWinner(p1, p2)).toMatchSnapshot()
    }
  )
})

describe(`# getRandomChoice`, () => {
  it('should return number betweeon 1 to 3', () => {
    const choice = getRandomChoice()
    const isInRange = choice >= 1 && choice <= 3
    expect(isInRange).toEqual(true)
  })
})

describe(`# getFrequent`, () => {
  it('shound count the occurrences of a value in the given array', () => {
    const choice = getFrequent(['p1', 'p1', 'p2', 'draw'])
    const result = new Map([
      ['p1', 2],
      ['p2', 1],
      ['draw', 1],
    ])
    expect(choice).toEqual(result)
  })
})

describe(`# getFinalWinner`, () => {
  it.each`
    p1                 | p2                 | expected
    ${Choice.rock}     | ${Choice.rock}     | ${Winner.draw}
    ${Choice.scissors} | ${Choice.rock}     | ${Winner.p1}
    ${Choice.rock}     | ${Choice.scissors} | ${Winner.p2}
  `(
    `returns $expected when p1 choice is $p1 and p2 choice is $p2`,
    ({ p1, p2 }) => {
      expect(getWinner(p1, p2)).toMatchSnapshot()
    }
  )
  // it('shound return p2 if draw and p2 have same score', () => {
  //   const winners = new Map([
  //     ['draw', 1],
  //     ['p2', 1],
  //   ])
  //   expect(getFinalWinner(winners)).toEqual('p2')
  // })

  // it('shound return draw if p1 and p2 have same score', () => {
  //   const winners = new Map([
  //     ['p1', 1],
  //     ['p2', 1],
  //   ])
  //   expect(getFinalWinner(winners)).toEqual('draw')
  // })

  // it('shound return p2 if p2 score is greater than p1', () => {
  //   const winners = new Map([
  //     ['p1', 1],
  //     ['p2', 2],
  //   ])
  //   expect(getFinalWinner(winners)).toEqual('p2')
  // })
})
