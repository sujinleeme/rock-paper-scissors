import type { AppProps } from 'next/app'

import { GameProvider } from '../context'

import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GameProvider>
        <Component {...pageProps} />
      </GameProvider>
    </>
  )
}

export default App
