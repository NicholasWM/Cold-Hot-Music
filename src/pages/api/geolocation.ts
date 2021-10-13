// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

interface WeatherProps {
    lat:string,
    lon:string,
}

type PositionStackItem = {
    country_code: string;
    region_code: string;
    region: string;
    locality: string;
    country: string;
    continent: string;
    label: string;
    name: string;
    longitude: string;
    latitude: string;
}

interface PositionStackResponse {
data: PositionStackItem[]
}

interface WeatherData {
    main:{
        temp: number
    },
    sys:{
        country: string
    },
    name: string,
    coord:{
        lon: number,
        lat: number,
    }
}
type ImagesProps = {
    background: string,
    coverart: string,
    coverarthq: string,
    joecolor: string,
}

interface TrackShazamData {
    track:{
        type: string,
        key: string,
        title: string,
        subtitle: string,
        share: {
            subject: string,
            text: string,
            href: string,
            image: string,
            twitter: string,
            html: string,
            avatar: string,
            snapchat: string
        },
        images: ImagesProps,
    }
}

interface ShazamResponseData {
    tracks:{
        hits: TrackShazamData[]
    }
}

const generateURI = {
    weather: ({lat,lon}:WeatherProps) => `http://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=${process.env.WEATHER_API_KEY}`,
    positionStack: (
        latitude:string,
        longitude:string
        )=> `http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITION_STACK_API_KEY}&query=${latitude},${longitude}`,

    shazamMusic: (genre:string, page=0):AxiosRequestConfig => (
        {
            method: 'GET',
                url: 'https://shazam.p.rapidapi.com/search',
            params: {term: genre, limit: 5, page: page},
            headers: {
                'x-rapidapi-host': 'shazam.p.rapidapi.com',
                'x-rapidapi-key': 'a2dde32e40msh1a0c16b89e09f95p1bfa65jsne006b9c6a2ad'
            }
    })
}

type Playlist = {
    artist: string,
    music: string,
    label: string,
    avatar: string,
    images: ImagesProps,
}

export interface GeolocationResponse {
    address:{
        country: string,
        continent: string,
        city: string,
        state: string,
        label: string,
    },
    selectedGenre: string,
    temperature: string,
    playlist: Playlist[]
}

function getGenre(temperature:number):'rock' | 'pop' | 'classica' | 'lofi'{
    if(temperature > 32){
        return 'rock'
    }else if(temperature > 32 && temperature > 24){
        return 'pop'
    }else if(temperature > 24 && temperature > 16){
        return 'classica'
    }
    return 'lofi'
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GeolocationResponse>,
    ) {
        try {
            const {latitude, longitude} = req.query
            const {data: positionStackResponse} = await axios.get<PositionStackResponse>(generateURI.positionStack(latitude, longitude))
            const {data: positionStackData} = positionStackResponse
            const {data: weatherData} = await axios.get<WeatherData>(generateURI.weather({lon:longitude, lat: latitude}))
            
            const temperature = Number(weatherData?.main?.temp) - 273.15
            const selectedGenre = getGenre(temperature)
            const {data: shazamData} = await axios.request<ShazamResponseData>(generateURI.shazamMusic(selectedGenre))
            console.log(shazamData.tracks.hits)

            res.status(200).json({
                address:{
                    country: positionStackData[0]?.country,
                    continent: positionStackData[0]?.continent,
                    city: positionStackData[0]?.locality,
                    state: positionStackData[0]?.region,
                    label: positionStackData[0]?.label,
                },
                temperature:temperature.toFixed(2),
                selectedGenre,
                playlist: shazamData.tracks.hits.map(({track}):Playlist => ({
                    artist: track?.title,
                    music: track?.subtitle,
                    label: track?.share?.subject,
                    avatar: track?.share.avatar,
                    images: track?.images,

                }))
            })
        } catch (error) {
            console.log(error);
            res.json(error)
        }
}
