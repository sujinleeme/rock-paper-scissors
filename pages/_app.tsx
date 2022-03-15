import type { AppProps } from 'next/app'

import { ChakraProvider, GlobalStyle, LightMode } from '@chakra-ui/react'

import { GameProvider } from '../context'

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider>
        <LightMode>
          <GlobalStyle />
          <GameProvider>
            <Component {...pageProps} />
          </GameProvider>
        </LightMode>
      </ChakraProvider>
    </>
  )
}

export default App
