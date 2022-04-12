import React, { useCallback } from 'react'

import {
  Box,
  Center,
  IconButton,
  useBoolean,
  UseCheckboxProps,
  VStack,
} from '@chakra-ui/react'
import {
  Avatar,
  CheckIcon,
  getOptions,
  HandSignButton,
  PlayerProgress,
  Popover,
  QuestionIcon,
  RadioCardGroup,
} from '@components'
import { Choice, Player } from '@types'

export interface PlayerCardProps extends UseCheckboxProps {
  isVisibleCard: boolean
  player: {
    type: 'p1' | 'p2'
  } & Pick<Player, 'name' | 'color'>
  isDisabled?: boolean
  onChangeCard?: (value: string) => void
  selectedCard?: Choice
  result?: string
  onClick?: () => void
  isFinalWinner: boolean
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  result,
  isFinalWinner,
  selectedCard,
  isVisibleCard,
  isDisabled = false,
  onChangeCard,
}) => {
  const [isPopoverOpen, setIsPopvoerOpen] = useBoolean(false)
  const { name, color, type } = player
  const choiceOptions = getOptions(Choice)

  const handleCardOnChange = useCallback(
    (value: string) => {
      if (!value) return
      setIsPopvoerOpen.off()
      onChangeCard && onChangeCard(value)
    },
    [onChangeCard, setIsPopvoerOpen]
  )

  const handleToggleOnClick = useCallback(() => {
    !isDisabled && setIsPopvoerOpen.toggle()
  }, [isDisabled, setIsPopvoerOpen])

  const placeIconButtonStyle = selectedCard
    ? {
        colorScheme: 'lightGreen',
        icon: <CheckIcon h={5} w={5} />,
      }
    : {
        colorScheme: 'white',
        icon: <QuestionIcon h={5} w={5} />,
      }

  const winnerStyle = isFinalWinner && {
    boxShadow: `0px 0px 30px 0px ${color}`,
    borderColor: 'transparent',
    _hover: 'none',
  }

  const toggleButtonBaseStyle = {
    size: 'lg',
    boxShadow: 'md',
    borderWidth: 1,
    borderRadius: 'full',
    h: '70px',
    w: '70px',
    _hover: {
      boxShadow: 'lg',
    },
  }

  const getPlayerStatusLabel = () => {
    if (isVisibleCard && result) return result
    return selectedCard ? 'Ready 👌' : undefined
  }

  return (
    <VStack spacing={4}>
      <Popover
        header="Select your choice"
        isOpen={isPopoverOpen}
        onClose={setIsPopvoerOpen.off}
        placement="top"
        toggler={
          !isVisibleCard ? (
            <IconButton
              aria-label="Select a card"
              onClick={handleToggleOnClick}
              {...placeIconButtonStyle}
              {...toggleButtonBaseStyle}
            />
          ) : (
            <HandSignButton
              {...winnerStyle}
              size="md"
              value={selectedCard}
              _hover={{
                background: '#fff',
                pointer: 'cursor',
              }}
            />
          )
        }
      >
        <Center>
          <RadioCardGroup
            value={selectedCard}
            options={choiceOptions}
            onChange={handleCardOnChange}
            isDisabled={isDisabled}
            radioComponent={HandSignButton}
          />
        </Center>
      </Popover>
      <Box alignContent="left">
        <Avatar
          name={name}
          bg={color}
          label={getPlayerStatusLabel()}
          {...winnerStyle}
        />
      </Box>
      <PlayerProgress player={type} />
    </VStack>
  )
}
