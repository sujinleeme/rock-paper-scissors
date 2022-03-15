import { useEffect } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useGameContext } from '@context/game'

const Play: NextPage = () => {
  const router = useRouter()
  const { state } = useGameContext()
  const { isPlaying } = state
  useEffect(() => {
    !isPlaying && router.push('./')
  }, [isPlaying, router])

  return (
    <div>
      <main>Play!</main>
    </div>
  )
}

export default Play
