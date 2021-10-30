import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export interface ShazamResponse {
    error?:any
    data: Music[]
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
export type Music = {
    artist: string,
    music: string,
    label: string,
    avatar: string,
    images: ImagesProps,
}
const shazamApi = axios.create({
    headers:{
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': `${process.env.SHAZAM_API_KEY}`,
        'Cache-Control': 's-maxage=86400'
    },
    baseURL:'https://shazam.p.rapidapi.com/',
})
export default async function Shazam(
    req: NextApiRequest,
    res: NextApiResponse<ShazamResponse>,
) {
    try {
        const {page, genre} = req.query
        const {data} = await shazamApi.get<ShazamResponseData>('search', {
            params: {
                offset:page,
                term: genre,
                locale: 'en-US',
                limit: 5,
            }
        })
        return res.json({
            data:data.tracks.hits.map(({track}):Music => ({
                artist: track?.title,
                music: track?.subtitle,
                label: track?.share?.subject,
                avatar: track?.share.avatar,
                images: track?.images,
            }))
        })
    } catch (error) {
        return res.json({
            data: [],
            error
        })        
    }
}