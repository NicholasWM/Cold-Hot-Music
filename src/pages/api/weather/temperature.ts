import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { appid, WeatherData } from ".";

export interface WeatherResponse {
    temperature: number,
    error?: any,
}
interface WeatherProps {
    latitude: string | string[],
    longitude: string | string[],
}

const weatherApi = axios.create({
    baseURL: `http://api.openweathermap.org/data/2.5`,
})

export default async function GetLocationTemperature(
    req: NextApiRequest,
    res: NextApiResponse<WeatherResponse>,
) {
    const { latitude, longitude }: WeatherProps = req.query
    try {
        const { data } = await weatherApi.get<WeatherData>('weather', { params: { lat: latitude, lon: longitude, appid } })

        return res.json({ temperature: Number(data?.main?.temp) - 273.15 })
    } catch (error) {
        return res.json({ error })
    }
}