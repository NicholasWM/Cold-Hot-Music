import type { GetServerSideProps, NextApiResponse, NextPage } from 'next'
import { useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'
import {
  Box,
  Flex,
  Text,
  Stack,
  Input,
  Wrap,
  Icon
} from '@chakra-ui/react'

import MapGL, {Marker, NavigationControl, GeolocateControl} from "react-map-gl";
import { BsFillCursorFill } from "react-icons/bs";
import { GeolocationResponse } from './api/geolocation';
interface LocationProps {
  latitude: number,
  longitude: number
}

const Home: NextPage = () => {
  const [locationData, setLocationData] = useState<GeolocationResponse>({})
  const [viewport, setViewport] = useState({
    longitude: -122.45,
    latitude: 37.78,
    zoom: 14
  });

  async function handleGetLocation(latitude:number, longitude:number){
    const {data} = await api.get<GeolocationResponse>('geolocation', {
      params:{latitude, longitude}
    })
    
    setLocationData(data)
    // console.log(latitude, longitude)
  }

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((pos)=> {
      const currentLocation = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      setViewport({...viewport, latitude: pos.coords.latitude, longitude: pos.coords.longitude})
      api.get('geolocation', {
        params:{...currentLocation}
      }).then(({data}) => setLocationData(data))
    })
  },[])
  return (
    <Box maxW="1440px" w="80vw" margin="5vh auto">
      <Stack 
        align="center" 
        flexDir="row" 
        justify="center" 
        fontSize={['24px', '38px']}
      >
        <Text as="h1" p="5px" mt="8px" color={'blue.500'} >Cold</Text>
        <Text as="h1" p="5px" color={'orange.400'}>Hot</Text>
        <Text as="h1" p="5px" color={'gray.200'} >Music</Text>
      </Stack>
      <Text fontSize={['18px', '24px']} lineHeight="10" mb={['10']} align="center">Permita acesso à sua localização, para receber a playlist do clima.</Text>
      <Wrap flexDir="row" align="center" justify="center">
        <Box maxW="600px" maxH="400px" borderColor="gray.500" borderWidth="5px" flex={0.5} id="mapContainer">
          <MapGL
            width="30vw"
            height="30vh"
            {...viewport}
            dragPan={true}
            doubleClickZoom={true}
            // mapOptions={{
            //   scrollZoom:true,
            //   interactive:true,
            //   container: 'mapContainer',
            //   touchPitch:true
            // }}
            mapStyle='mapbox://styles/mapbox/streets-v11'
            mapboxApiAccessToken={"pk.eyJ1IjoibmljaG9sYXN3bSIsImEiOiJja3VvbTI0dno0Y21sMnBuejFvdWZ1YnBzIn0.M0eeh9lz2aCWopPCVMPehQ"}
            onViewportChange={setViewport}
          >
            <GeolocateControl
              style={{top:10, right:10}}
              positionOptions={{enableHighAccuracy: true}}
              trackUserLocation={true}
              auto
            />
            <Marker
              capturePointerMove={true} 
              captureDrag={true} 
              onDragEnd={({lngLat})=> {
                handleGetLocation(lngLat[1], lngLat[0])
              }} 
              onDrag={({lngLat})=>setViewport({...viewport, longitude: lngLat[0], latitude: lngLat[1]})} 
              latitude={viewport.latitude} 
              longitude={viewport.longitude} 
              draggable={true}
            >
              <Icon h={['30px']} w={['30px']} as={BsFillCursorFill} color="red.600"/>

            </Marker>
            <NavigationControl style={{right: 10, top:10}} />
          </MapGL>
          <Box px="10px" py="10px" borderTopColor="gray.500" borderTopWidth="5px">
            <Text>Latitude: {viewport.latitude}</Text>
            <Text>Longitude: {viewport.longitude}</Text>
          </Box>
        </Box>
        {/* <Text>{JSON.stringify(locationData)}</Text> */}
        <Stack 
          width="30vw"
          height="30vh"
        >
          <Text >{locationData?.selectedGenre}</Text>
          <Text>{locationData?.temperature}</Text>
          <Text>{locationData?.address?.country}</Text>
        </Stack>
      </Wrap>
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