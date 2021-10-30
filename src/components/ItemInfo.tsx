import {
    Flex,
    Text
} from '@chakra-ui/react'
import { memo } from 'react'
import { useTheme } from '../contexts/Theme'

interface ItemInfoProps {
    title: string,
    label: string,
}

export const ItemInfo = memo(function ItemInfoComponent({label, title}:ItemInfoProps){
    const {themeColors} = useTheme()
    return (
        <Flex textAlign="center" borderColor={themeColors?.borderColor} borderWidth="1px" flexDir="column" w="100%" justify="center">
            <Text w="100%" p="2px" fontSize={['20px']} color={themeColors?.textColor}>{title}</Text>
            <Text w="100%" p="2px" borderTopWidth='3px' borderColor={themeColors?.borderColor} fontSize={['16px']}>{label}</Text>
        </Flex>
    )
})