import { useDisclosure, ScaleFade, Button } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { useNotifier } from "../contexts/Notifier";
import { usePlaylists } from "../contexts/Playlists";

interface PlaylistProps {
    children: ReactNode,
    index: number
}

export function Playlist({ children, index }: PlaylistProps) {
    const { isOpen, onToggle } = useDisclosure()
    const { removeSavedPlaylistByIndex } = usePlaylists()
    const { toggleNotifier } = useNotifier()
    useEffect(()=>{
        onToggle()
    },[])
    return (
        <ScaleFade delay={0.4} in={isOpen} initialScale={0.9} >
            <div style={{ margin: "1.5rem", borderWidth: "1px" }}>
                {children}
                <Button
                    onClick={() => {
                        onToggle()
                        removeSavedPlaylistByIndex(index)
                        toggleNotifier({ message: 'Playlist Deletada com Sucesso!', status: 'success' })
                    }}
                    my="10px"
                    colorScheme="red"
                >
                    Remover Playlist
                </Button>
            </div>
        </ScaleFade>

    )
}