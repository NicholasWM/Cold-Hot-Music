import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { LocationProvider } from '../contexts/Location'
import PlaylistsProvider from '../contexts/Playlists'
import { NotifierProvider } from '../contexts/Notifier'
import { Notifier } from '../components/Notifier'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NotifierProvider>
        <LocationProvider>
          <PlaylistsProvider>
            <Component {...pageProps} />
            <Notifier/>
          </PlaylistsProvider>
        </LocationProvider>
      </NotifierProvider>
    </ChakraProvider>
  )
}
export default MyApp
