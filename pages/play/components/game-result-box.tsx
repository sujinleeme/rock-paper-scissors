import React from 'react'
import { Twemoji } from 'react-emoji-render'
import { getGameResultText } from 'utils'

import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { Button, LinkButton } from '@components'
import { useGameContext } from '@context/game'

interface GameResultBoxProps {
  onClickTryAgainButton: () => void
}

export const GameResultBox: React.FC<GameResultBoxProps> = ({
  onClickTryAgainButton,
}) => {
  const { state } = useGameContext()
  const { isFinished, finalWinner } = state
  if (!isFinished) return <Box />
  const winnerText = getGameResultText(finalWinner)
  return (
    <VStack spacing={5} justifyContent="center">
      <Text fontSize="md">
        <Twemoji svg text={winnerText} className="emoji" />
      </Text>
      <HStack spacing={5}>
        <Button onClick={onClickTryAgainButton}>Try again?</Button>
        <LinkButton onClick={onClickTryAgainButton} href="/">
          Go to main
        </LinkButton>
      </HStack>
    </VStack>
  )
}

export default GameResultBox
