import {
    Stack,
    Text,
    Flex,
    Icon,
    Button,
    ButtonGroup,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaTemperatureLow } from 'react-icons/fa'

import { useLocation } from '../contexts/Location'
import { useEffect, useState } from 'react'

export function Header(){
    const {temperature} = useLocation()
    const [pathname, setPathname] = useState('/')
    useEffect(()=>{
        setPathname(window.location.pathname)
    },[])
    return (
        <>
            <Stack 
                align="center" 
                flexDir="row" 
                justify="center" 
                fontSize={['30px', '32px', '34px', '38px']}
                fontWeight="700"
            >
                <Text as="h1" p="5px" mt="8px" color={'blue.500'} >Cold</Text>
                <Text as="h1" p="5px" color={'orange.400'}>Hot</Text>
                <Text as="h1" p="5px" color={'gray.200'} >Music</Text>
            </Stack>
            <Flex flexDir="row" justify="center" align="center">
                <Icon color="orange.400" h="20px" w='20px' as={FaTemperatureLow}/>
                <Text color="orange.400" ml={['10px']} fontSize={['14px']}>{temperature} Celsius</Text>
            </Flex>
            <ButtonGroup style={{marginTop:'1.5rem'}}>
                <Link href="/">
                    <Button
                        disabled={pathname == '/'} 
                        onClick={(e)=>{setPathname(e.view.location.pathname)}} 
                        colorScheme="orange" 
                        _hover={{bg:'orange.600'}} 
                        bg="orange.500" 
                        w="20vw">
                            Home
                    </Button>
                </Link>
                <Link href="/savedPlaylists">
                    <Button 
                        disabled={pathname == '/savedPlaylists'} 
                        onClick={(e)=>{setPathname(e.view.location.pathname)}} 
                        colorScheme="orange" 
                        _hover={{bg:'orange.600'}} 
                        bg="orange.500" 
                        w="20vw"
                    >
                        Playlists Salvas
                    </Button>
                </Link>
            </ButtonGroup>
      </>
    )
}