import {
    Flex,
    Text
} from '@chakra-ui/react'

interface ItemInfoProps {
    title: string,
    label: string,
}

export function ItemInfo({label, title}:ItemInfoProps){
    return (
        <Flex textAlign="center" borderColor={"orange.400"} borderWidth="1px" flexDir="column" w="100%" justify="center">
            <Text w="100%" p="2px" fontSize={['20px']} color={"orange.400"}>{title}</Text>
            <Text w="100%" p="2px" borderTopWidth='3px' borderColor={"orange.400"} fontSize={['16px']}>{label}</Text>
        </Flex>
    )
}