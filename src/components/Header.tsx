import {
    Stack,
    Text,
    Flex,
    Icon,
} from '@chakra-ui/react'
import { FaTemperatureLow } from 'react-icons/fa'
import { useLocation } from '../contexts/Location'

export function Header(){
    const {temperature} = useLocation()
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
      </>
    )
}