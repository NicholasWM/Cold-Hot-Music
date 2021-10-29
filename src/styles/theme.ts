import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
    fonts:{
        heading: 'Khand',
        body: 'Khand, sans-serif',
        h1: "Khand, sans-serif"
    },
    styles:{
        global:{
            body:{
                bg: 'gray.900',
                color: 'gray.50',
                textAlign:'center',
            }

        }
    }
})