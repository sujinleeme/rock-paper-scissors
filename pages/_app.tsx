import type { AppProps } from 'next/app'

import { ChakraProvider } from '@chakra-ui/react'

import { GameProvider } from '../context'

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <GameProvider>
          <Component {...pageProps} />
        </GameProvider>
      </ChakraProvider>
    </>
  )
}

export default App
