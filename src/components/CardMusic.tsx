import {
    Box,
    Text,
    Flex,
    Image,
    Avatar
} from '@chakra-ui/react'
import { memo } from 'react'
import { useTheme } from '../contexts/Theme'
import { Music } from '../pages/api/shazam'

interface CardMusicProps {
    music: Music
}

export const CardMusic = memo(function CardMusicComponent({ music }: CardMusicProps) {
    const {themeColors} = useTheme()
    return (
        <Flex flexDir='row' align="center">
            <Box
                w={['150px', '150px', '170px']}
                px={['10px']}
            >
                <Image
                    w={['150px', '150px', '170px']}
                    src={music.images.coverart}
                />
                <Flex bg="gray.800" borderColor={themeColors?.borderColor} borderWidth="0 1px 1px 1px" flexDir={'row'} align="center" justify="space-between" p={['10px']}>
                    <Box textAlign='left' ml={['2px']}>
                        <Text fontSize={['12px', '12px', '15px']}>{music.music}</Text>
                        <Text fontSize={['10px', '10px', '12px']}>{music.artist}</Text>
                    </Box>
                    <Avatar h={['20px', '30px']} w={['20px', '30px']} name={music.artist} src={music.avatar} />
                </Flex>
            </Box>
        </Flex>
    )
})

// export CardMusic
