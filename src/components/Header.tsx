import {
    Stack,
    Text,
    Flex,
    Icon,
    Button,
    Wrap,
} from '@chakra-ui/react'
import Link from 'next/link'
import { FaTemperatureLow } from 'react-icons/fa'
import { useLocation } from '../contexts/Location'
import { memo, useEffect, useState } from 'react'
import { useTheme } from '../contexts/Theme'

export const Header = memo(function HeaderComponent(){
    const {temperature} = useLocation()
    const {themeColors} = useTheme()
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
                <Icon color={themeColors?.temperature} h="20px" w='20px' as={FaTemperatureLow}/>
                <Text color={themeColors?.temperature} ml={['10px']} fontSize={['14px']}>{temperature} Celsius</Text>
            </Flex>
            <Wrap style={{marginTop:'20px'}}  alignItems="center" justify="center" >
                <Link href="/">
                    <Button
                        m={'10px'}
                        disabled={pathname == '/'} 
                        onClick={()=>{setPathname('/')}} 
                        colorScheme={themeColors?.buttonColor}
                        _hover={{bg:`${themeColors?.hoverButton}`}} 
                        bg={themeColors?.temperature} 
                        w={['20rem']}
                    >
                            Home
                    </Button>
                </Link>
                <Link href="/savedPlaylists">
                    <Button 
                        m={'10px'}
                        disabled={pathname == '/savedPlaylists'} 
                        onClick={()=>{setPathname('/savedPlaylists')}} 
                        colorScheme={themeColors?.buttonColor}
                        _hover={{bg:`${themeColors?.hoverButton}`}} 
                        bg={themeColors?.temperature} 
                        w={['20rem']}
                    >
                        Playlists Salvas
                    </Button>
                </Link>
            </Wrap>
      </>
    )
})