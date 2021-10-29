import { NextApiRequest, NextApiResponse } from "next";
import { appid, weatherApi, WeatherData, WeatherResponse } from ".";

export interface WeatherTemperatureResponse {
    temperature?: number,
    error?: any,
}

export default async function GetLocationTemperature(
    req: NextApiRequest,
    res: NextApiResponse<WeatherTemperatureResponse>,
) {
    const { latitude, longitude } = req.query
    try {
        const { data } = await weatherApi.get<WeatherData>('weather', { params: { lat: latitude, lon: longitude, appid } })

        return res.json({ temperature: Number((Number(data?.main?.temp.toFixed(2)) - 273.15).toFixed(2)) })
    } catch (error) {
        return res.json({ error })
    }
}