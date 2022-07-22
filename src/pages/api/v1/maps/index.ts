import { NextApiRequest, NextApiResponse } from "next";
import mapJSON from "../../../../utils/maps.json";


export default (req:NextApiRequest, res:NextApiResponse) => {

        const {
            method
          } = req

          
        
          switch (method) {
            case 'GET':
              // Get data from your database
              res.status(200).json({ mapJSON })
              break
            default:
              res.setHeader('Allow', ['GET'])
              res.status(405).end(`Method ${method} Not Allowed`)
          }
}
