// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
    ) {
    const {latitude, longitude} = req.query
    const apiURI = `http://api.positionstack.com/v1/reverse?access_key=${process.env.POSITION_STACK_API_KEY}&query=${latitude},${longitude}`
    const {data} = await axios.get(apiURI)
    res.status(200).json(data)
}
