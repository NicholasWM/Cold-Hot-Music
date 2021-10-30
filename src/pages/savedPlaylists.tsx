import { NextPage } from "next";
import React from 'react'
import {
  Stack,
  Wrap,
} from '@chakra-ui/react'
import { CardMusic } from "../components/CardMusic";
import { usePlaylists } from "../contexts/Playlists";
import { Header } from "../components/Header";
import { Playlist } from "../components/Playlist";
const SavedPlaylists: NextPage = () => {
    const { savedPlaylists } = usePlaylists()
    return (
        <Stack
            align="center"
            my="20px"
        >
            <Header/>
            {savedPlaylists.map((playlist, index) =>
                <Playlist key={`${index}-playlist`} index={index}>
                    <Wrap borderWidth="1px" p="10px" spacing={['5px']}>
                        {playlist?.map((music, index) => (
                            <CardMusic key={`${index}-${music.label}-${index}`} music={music} />
                        ))}
                    </Wrap>
                   
                </Playlist>
            )
            })
        </Stack>
    )
}

export default SavedPlaylists