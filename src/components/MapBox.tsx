import type { GetServerSideProps } from 'next'
import { memo, useEffect, useState } from 'react'
import { api } from '../services/api'
import {
    Box,
    Text,
    Icon,
} from '@chakra-ui/react'

import MapGL, { Marker, NavigationControl, GeolocateControl } from "react-map-gl";
import { BsFillCursorFill } from "react-icons/bs";
import { GeolocationResponse } from '../pages/api/geolocation';

export const MapBox = memo(function MapBoxComponent() {
    const [viewport, setViewport] = useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14
    });

    const [size, setSize] = useState({
        x: 0,
        y: 0,
    });
    const updateSize = () =>
        setSize({
            x: window.innerWidth,
            y: window.innerHeight
        });
    async function handleGetLocation(latitude: number, longitude: number) {
        const { data } = await api.get<GeolocationResponse>('geolocation', {
            params: { latitude, longitude }
        })

        // setLocationData(data)
        // console.log(latitude, longitude)
    }
    useEffect(() => (window.onresize = updateSize), []);
    useEffect(() => {
        updateSize()
        navigator.geolocation.getCurrentPosition((pos) => {
            const currentLocation = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
            }
            setViewport({ ...viewport, latitude: pos.coords.latitude, longitude: pos.coords.longitude })
        })
    }, [])
    return size.x >= 375 ? (
        <Box maxW="310px" maxH="400px" borderColor="gray.500" borderWidth="5px" flex={0.5} id="mapContainer">
            <MapGL
                width="300px"
                height="250px"
                {...viewport}
                // dragPan={true}
                doubleClickZoom={true}
                // onWheel={() => { console.log('WHEEEL') }}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                mapboxApiAccessToken={"pk.eyJ1IjoibmljaG9sYXN3bSIsImEiOiJja3VvbTI0dno0Y21sMnBuejFvdWZ1YnBzIn0.M0eeh9lz2aCWopPCVMPehQ"}
                onViewportChange={setViewport}
            >
                <GeolocateControl
                    style={{ top: 10, right: 10 }}
                    positionOptions={{ enableHighAccuracy: true }}
                    trackUserLocation={true}
                    auto
                />
                <Marker
                    capturePointerMove={true}
                    captureDrag={true}
                    onDragEnd={({ lngLat }) => {
                        handleGetLocation(lngLat[1], lngLat[0])
                    }}
                    onDrag={({ lngLat }) => setViewport({ ...viewport, longitude: lngLat[0], latitude: lngLat[1] })}
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                    draggable={true}
                >
                    <Icon h={['30px']} w={['30px']} as={BsFillCursorFill} color="red.600" />

                </Marker>
                <NavigationControl style={{ right: 10, top: 10 }} />
            </MapGL>
            <Box px="10px" py="10px" borderTopColor="gray.500" borderTopWidth="5px">
                <Text>Latitude: {viewport.latitude}</Text>
                <Text>Longitude: {viewport.longitude}</Text>
            </Box>
        </Box>
    ) : <></>
})
export const getServerSideProps: GetServerSideProps = async () => {


    return {
        props: {

        }
    }
}