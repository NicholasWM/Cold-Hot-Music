import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { LocationProvider } from '../contexts/Location'
import PlaylistsProvider from '../contexts/Playlists'
import { NotifierProvider } from '../contexts/Notifier'
import { Notifier } from '../components/Notifier'
import { ThemeProvider } from '../contexts/Theme'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ThemeProvider>
        <NotifierProvider>
          <LocationProvider>
            <PlaylistsProvider>
              <Component {...pageProps} />
              <Notifier/>
            </PlaylistsProvider>
          </LocationProvider>
        </NotifierProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}
export default MyApp
