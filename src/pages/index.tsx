import type { GetServerSideProps, NextPage } from 'next'
import React, {  } from 'react'
import {
  Box,
  Stack,
  Wrap,
  Button,
  ButtonGroup,
  IconButton,
  Spinner,
  Flex,
} from '@chakra-ui/react'
import { AiOutlineArrowRight } from 'react-icons/ai'
import Head from 'next/head'
import { ItemInfo } from '../components/ItemInfo';
import { Header } from '../components/Header';
import { MapBox } from '../components/MapBox';
import { useLocation } from '../contexts/Location';
import { usePlaylists } from '../contexts/Playlists';
import { CardMusic } from '../components/CardMusic';
import { useNotifier } from '../contexts/Notifier';
import { useTheme } from '../contexts/Theme';

const Home: NextPage = () => {
  const { address } = useLocation()
  const { themeColors } = useTheme()
  const { toggleNotifier } = useNotifier()
  const { playlists, selectedGenre, hasPlaylist, nextPage, loadingNextPage, savePlaylist, savedPlaylists } = usePlaylists()

  return (
    <>
      <Head>
        <title>Home | Cold Hot Music</title>
      </Head>
      <Flex flexDir="column" align="center" maxW="1440px" w="80vw" margin="1vh auto">
        <Header />

        <Wrap mb={["70px"]} mt={["40px"]} flexDir="row" spacing={["70px"]} align="center" justify="center">
          <MapBox />
          <Stack
            width={["80vw", "80vw", "30vw"]}
            height={["30vh"]}
            align="center"
            justify="center"
          >
            {!address?.city ? (
              <Spinner size="xl" color="orange.400" />
            ) : (
              <>
                <ItemInfo title="Continente" label={address?.continent} />
                <ItemInfo title="País" label={address?.country} />
                <ItemInfo title="Estado" label={address?.state} />
                <ItemInfo title="Cidade" label={address?.city} />
              </>
            )}
          </Stack>
        </Wrap>
        <Stack
          my={["60px", "30px"]}
          width="100%"
          align="center"
          justify="center"
          maxW="1250px"
        >
          <Box borderColor={themeColors?.borderColor || 'white'} borderWidth='1px' >
            <ItemInfo title="Playlist Recomendada" label={`Gênero: ${selectedGenre.toUpperCase()}`} />
            <Wrap flexDir='column' justify="center" flexWrap="wrap" py={['10px']}>
              {!hasPlaylist ? <Spinner size="xl" />
                : playlists?.map((item, index) => (
                  <CardMusic key={`${index}-${item.label}-${index}`} music={item} />
                ))
              }
            </Wrap>
          </Box>
          <ButtonGroup size="lg" variant="solid" my={['10px', '20px']} px={['5px']}>
            {
              !loadingNextPage && (
                <Button
                  onClick={() => {
                    savePlaylist()
                    toggleNotifier({status:"success", message:"Playlist Salva com Sucesso!"})
                  }}
                  isLoading={false}
                  w={["120px", "150px", "200px", "300px"]}
                  mx={['3px']}
                  colorScheme={"green"}
                  bg={"green.500"}
                >
                  Save
                </Button>
              )
            }
            <IconButton onClick={nextPage} isLoading={loadingNextPage} w={[ "120px", "150px", "200px", "300px"]} colorScheme={'blue'} bg='blue.500' aria-label="New Random List" icon={<AiOutlineArrowRight />} />
          </ButtonGroup>
        </Stack>
      </Flex>
    </>
  )
}
export default Home
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  return {
    props: {}
  }
}