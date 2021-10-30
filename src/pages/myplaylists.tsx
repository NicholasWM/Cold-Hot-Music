import React from 'react'
import { NextPage } from "next";
import Head from 'next/head'
import {
  Stack,
  Wrap,
} from '@chakra-ui/react'
import { CardMusic } from "../components/CardMusic";
import { usePlaylists } from "../contexts/Playlists";
import { Header } from "../components/Header";
import { Playlist } from "../components/Playlist";
import { useTheme } from "../contexts/Theme";
const MyPlaylists: NextPage = () => {
    const { savedPlaylists } = usePlaylists()
    const { themeColors } = useTheme()

    return (
        <>
            <Head>
                <title>Minhas Playlists | Cold Hot Music</title>
            </Head>
            <Stack
                align="center"
                my="20px"
            >
                <Header/>
                {savedPlaylists.map((playlist, index) =>
                    <Playlist key={`${index}-playlist`} index={index}>
                        <Wrap justify="center" borderColor={themeColors?.borderColor} borderBottomWidth="1px" p="10px" spacing={['5px']}>
                            {playlist?.map((music, index) => (
                                <CardMusic key={`${index}-${music.label}-${index}`} music={music} />
                            ))}
                        </Wrap>
                    
                    </Playlist>
                )
                })
            </Stack>
        </>
    )
}

export default MyPlaylists