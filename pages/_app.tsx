import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider, GlobalStyle, LightMode } from '@chakra-ui/react'

import { GameProvider } from '../context'
import theme from '../theme'

import '@fontsource/inter/400.css'
import '@fontsource/inter/700.css'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rock Paper Scissors</title>
        <meta name="description" content="Let's play rock paper scissors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
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
