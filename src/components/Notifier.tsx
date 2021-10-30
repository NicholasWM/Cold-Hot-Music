import React, { memo } from 'react'
import {
  Alert,
  AlertIcon,
  Slide
} from '@chakra-ui/react'
import { useNotifier } from '../contexts/Notifier'
import { useTheme } from '../contexts/Theme'

export const Notifier = memo(function NotifierComponent(){
    const {isNotifierActive, message, status} = useNotifier()
    const {themeColors} = useTheme()
    return (
        <>
            <Slide direction="right" in={isNotifierActive} style={{ zIndex: 10 }}>
                <Alert top="40px" right="0px" position="fixed" status={status} bg="green.800" maxW="400px">
                <AlertIcon />
                {message}
                </Alert>
            </Slide>
        </>
    )
})