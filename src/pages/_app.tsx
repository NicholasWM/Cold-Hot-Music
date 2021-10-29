import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../styles/theme'
import { LocationProvider } from '../contexts/Location'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LocationProvider>
        <Component {...pageProps} />
      </LocationProvider>
    </ChakraProvider>
  )
}
export default MyApp
