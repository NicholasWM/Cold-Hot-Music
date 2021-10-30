import { useDisclosure, Button, Box } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";
import { useNotifier } from "../contexts/Notifier";
import { usePlaylists } from "../contexts/Playlists";
import { useTheme } from "../contexts/Theme";

interface PlaylistProps {
    children: ReactNode,
    index: number
}

export function Playlist({ children, index }: PlaylistProps) {
    const { onOpen, onClose } = useDisclosure()
    const { removeSavedPlaylistByIndex } = usePlaylists()
    const { toggleNotifier } = useNotifier()
    const { themeColors } = useTheme()

    useEffect(()=>{
        onOpen()
    },[])
    return (
        <Box borderColor={themeColors?.borderColor} borderWidth='1px' style={{marginTop:'30px'}}>
            {children}
            <Button
                size='lg'
                w="80%"
                onClick={() => {
                    onClose()
                    removeSavedPlaylistByIndex(index)
                    toggleNotifier({ message: 'Playlist Deletada com Sucesso!', status: 'success' })
                }}
                my="10px"
                colorScheme="red"
            >
                Remover Playlist
            </Button>
        </Box>
    )
}