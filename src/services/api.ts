import axios from 'axios'
import { Address, GeolocationResponse } from '../pages/api/geolocation'
import { ShazamResponse } from '../pages/api/shazam'
import { WeatherTemperatureResponse } from '../pages/api/weather/temperature'

export const api = axios.create({
    baseURL:'http://localhost:3000/api'
})

export interface LocationResponse {
    address?: Address,
    error?: any,
}

export async function getLocation(latitude?: number, longitude?:number): Promise<LocationResponse> {
    try {
        const {data} = await api.get<GeolocationResponse>('geolocation', {
            params: {latitude, longitude}
        })
        return {
            address:data.data
        }
    } catch (error) {
        return {
            error
        }
    }
}

export async function getWeather(latitude?: number, longitude?:number): Promise<WeatherTemperatureResponse> {
    const {data} = await api.get<WeatherTemperatureResponse>('weather/temperature', {
        params: {latitude, longitude}
    })
    return data
}

export async function getPlaylist(page?: number, genre?:string): Promise<ShazamResponse> {
    const {data} = await api.get<ShazamResponse>('shazam', {
        params: {page, genre}
    })
    console.log(data)
    return data
}