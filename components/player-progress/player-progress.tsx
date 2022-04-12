import React from 'react'

import { Box, HStack } from '@chakra-ui/react'
import { HandSignButton } from '@components'
import { useGameContext } from '@context/game'

interface PlayerProgress {
  player: 'p1' | 'p2'
}

export const PlayerProgress: React.FC<PlayerProgress> = ({ player }) => {
  const { state } = useGameContext()
  const { players, totalRounds, winners, currentRound, winnerOfRound } = state
  const choices = players[player].choices

  const getValue = (i: number) => {
    const value = choices[i]
    if (i === currentRound - 1 && !winnerOfRound) {
      return undefined
    }
    return value
  }

  const isVisible = totalRounds > 1
  if (!isVisible) return <Box />

  return (
    <HStack spacing={1}>
      {[...Array(totalRounds)].map((el, index) => (
        <HandSignButton
          size="xs"
          border="none"
          bg="gray.100"
          opacity={winners[index] === player ? 1 : 0.5}
          key={index}
          value={getValue(index)}
          _hover={{
            bg: 'gray.100',
          }}
        />
      ))}
    </HStack>
  )
}
