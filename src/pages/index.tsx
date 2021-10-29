import type { GetServerSideProps, NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  Box,
  Stack,
  Wrap,
  Button,
  ButtonGroup,
  IconButton,
  Spinner,
} from '@chakra-ui/react'
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'react-icons/ai'
import { ItemInfo } from '../components/ItemInfo';
import { Header } from '../components/Header';
import { MapBox } from '../components/MapBox';
import { useLocation } from '../contexts/Location';

const Home: NextPage = () => {
  const {address} = useLocation()

  return (
    <Box maxW="1440px" w="80vw" margin="1vh auto">
      <Header/>

      <Wrap mb={["70px"]} mt={["40px"]} flexDir="row" spacing={["70px"]} align="center" justify="center">
        <MapBox/>
        <Stack 
          width={["80vw","80vw","30vw"]}
          height={["30vh"]}
          align="center"
          justify="center"
        >
          {!address?.city ? (
              <Spinner size="xl" color="orange.400"/>
          ) :(
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
        my={["60px","30px"]}
        width="100%"
        align="center"
        justify="center"
        maxW="1250px"
      >
        {/* <Box borderColor="orange.400" borderWidth='1px' >
              <ItemInfo title="Playlist Recomendada" label={locationData?.selectedGenre} />
              <Wrap flexDir='column' justify="center" flexWrap="wrap" py={['10px']}>
                {false
                  ? <Spinner size="xl"/>
                  : locationData?.playlist?.map(item => (
                    <Flex flexDir='row'>
                      <Box>
                        <Image 
                          w={['150px','150px','200px']}
                          h={['150px','150px','200px']}
                          src={item.images.coverart}
                        />
                        <Flex bg="gray.800" borderColor="orange.400" borderWidth="0 1px 1px 1px" flexDir={'row'} align="center" justify="space-between" p={['10px']}>
                          <Box textAlign='left' ml={['2px']}>
                            <Text fontSize={['12px','12px','15px']}>{item.music}</Text>
                            <Text fontSize={['10px','10px','12px']}>{item.artist}</Text>
                          </Box>
                          <Avatar h={['20px','30px']} w={['20px','30px']} name={item.artist} src={item.avatar}/>
                        </Flex>
                      </Box>
                    </Flex>
                  ))                  
                }
              </Wrap>
          </Box> */}
          <ButtonGroup size="lg" variant="solid" my={['10px','20px']} px={['5px']}>
            <IconButton isLoading={false} w={["30px","40px",'70px',"100px"]} colorScheme="orange" aria-label="Add to friends" icon={<AiOutlineArrowLeft />} />
            <Button isLoading={false} w={["120px","200px","300px","400px","600px"]} mx={['3px']} colorScheme="orange" >Save</Button>
            <IconButton isLoading={false} w={["30px","40px",'70px',"100px"]} colorScheme="orange" aria-label="Add to friends" icon={<AiOutlineArrowRight />} />
          </ButtonGroup>
      </Stack>
    </Box>
  )
}
export default Home
export const getServerSideProps:GetServerSideProps = async ()=>{

  
  return {
    props:{
      
    }
  }
} 