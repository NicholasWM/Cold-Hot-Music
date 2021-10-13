// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios, { AxiosRequestConfig } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

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

const generateURI = {
    positionStack: (
        latitude:string,
        longitude:string
        )=> `http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITION_STACK_API_KEY}&query=${latitude},${longitude}`,
}

const positionStackApi = axios.create({
    baseURL: "http://api.positionstack.com"
})

export interface Address {
    country: string,
    continent: string,
    city: string,
    state: string,
    label: string,
}

export interface GeolocationResponse {
    error?: any,
    data?: Address
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GeolocationResponse>,
    ) {
        try {
            const {latitude, longitude} = req.query
            const {data: positionStackResponse} = await positionStackApi.get<PositionStackResponse>('v1/reverse', {params:{access_key:process.env.POSITION_STACK_API_KEY,query:`${latitude},${longitude}`}})
            const {data: positionStackData} = positionStackResponse
            res.status(200).json({

                data:{
                    country: positionStackData[0]?.country,
                    continent: positionStackData[0]?.continent,
                    city: positionStackData[0]?.locality,
                    state: positionStackData[0]?.region,
                    label: positionStackData[0]?.label,
                },
            })
        } catch (error) {
            console.log(error);
            res.json({error})
        }
}
