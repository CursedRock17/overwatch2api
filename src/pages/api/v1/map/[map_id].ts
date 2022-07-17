import { NextApiRequest, NextApiResponse } from "next";
import mapsJSON from "../../../../utils/maps.json";


export default (req:NextApiRequest, res:NextApiResponse) => {

    const {
        method
      } = req

      switch (method) {
        case 'GET':
          // Get data from your database
          const currentMap:string = String(req.query.map_id)
          const currentHero = mapsJSON[0]?.Hanamura
          
          res.status(200).json({ currentHero })
          break
        default:
          res.setHeader('Allow', ['GET'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
}
