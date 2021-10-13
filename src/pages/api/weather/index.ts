import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface WeatherResponse {
    data?: WeatherData,
    error?:any
}

interface WeatherProps {
    latitude:string | string[],
    longitude:string | string[],
}

export interface WeatherData {
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
export const appid = process.env.WEATHER_API_KEY

export const weatherApi = axios.create({
    baseURL:`http://api.openweathermap.org/data/2.5`,
})
export default async function handleWeatherByLocation(
    req: NextApiRequest,
    res: NextApiResponse<WeatherResponse>,
){
    const {latitude, longitude}:WeatherProps = req.query
    try {
      const {data} = await weatherApi.get<WeatherData>('weather',{params:{lat:latitude, lon:longitude, appid}})
      return res.json({data})
    } catch (error) {
        return res.json({error})
    }
}