import React from 'react'
import { Twemoji } from 'react-emoji-render'

import { Avatar as AvatarBase, Tag, TagLabel, Text } from '@chakra-ui/react'

interface AvatarProps {
  name?: string
  bg: string
  label?: string
}
export const Avatar: React.FC<AvatarProps> = ({
  name,
  label,
  bg,
  ...props
}) => {
  return (
    <Tag
      size="lg"
      borderRadius="full"
      px={1}
      py={1}
      bg="white"
      borderWidth={1}
      {...props}
    >
      <AvatarBase size="sm" color="#fff" bg={bg} name={name} />
      {label && (
        <TagLabel px={2} fontWeight="400" color="gray.700">
          <Text>
            <Twemoji svg text={label} className="emoji" />
          </Text>
        </TagLabel>
      )}
    </Tag>
  )
}
