import { useDisclosure, ScaleFade, Button } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useNotifier } from "../contexts/Notifier";
import { usePlaylists } from "../contexts/Playlists";

interface PlaylistProps {
    children: ReactNode,
    index: number
}

export function Playlist({ children, index }: PlaylistProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { removeSavedPlaylistByIndex } = usePlaylists()
    const { toggleNotifier } = useNotifier()
    useEffect(()=>{
        onOpen()
    },[])
    return (
        <div style={{ margin: "1.5rem", borderWidth: "1px" }}>
            {children}
            <Button
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
        </div>
    )
}