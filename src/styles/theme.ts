import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({

    fonts:{
        heading: 'Roboto',
        body: 'Roboto',
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