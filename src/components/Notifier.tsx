import React, { useEffect, useState } from 'react'
import {
  Alert,
  AlertIcon,
  Slide
} from '@chakra-ui/react'
import { useNotifier } from '../contexts/Notifier'

export function Notifier(){
    const {isNotifierActive, message, status} = useNotifier()
    return (
        <>
            <Slide direction="right" in={isNotifierActive} style={{ zIndex: 10 }}>
                <Alert bottom="40px" right="0px" position="fixed" status={status} bg="green.800" maxW="400px">
                <AlertIcon />
                {message}
                </Alert>
            </Slide>
        </>
    )
}