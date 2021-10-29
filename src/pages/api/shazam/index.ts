import axios, { AxiosRequestConfig } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface ShazamResponse {
    error?:any
    data?: Playlist[]
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
type Playlist = {
    artist: string,
    music: string,
    label: string,
    avatar: string,
    images: ImagesProps,
}

const shazamApi = axios.create({
    headers:{
        'x-rapidapi-host': 'shazam.p.rapidapi.com',
        'x-rapidapi-key': 'a2dde32e40msh1a0c16b89e09f95p1bfa65jsne006b9c6a2ad'
    },
    baseURL:'https://shazam.p.rapidapi.com/',
})
export default async function Shazam(
    req: NextApiRequest,
    res: NextApiResponse<ShazamResponse>,
) {
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
        data:data.tracks.hits.map(({track}):Playlist => ({
            artist: track?.title,
            music: track?.subtitle,
            label: track?.share?.subject,
            avatar: track?.share.avatar,
            images: track?.images,

        }))
    })
}