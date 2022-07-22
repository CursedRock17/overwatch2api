import { NextApiRequest, NextApiResponse } from "next";
import { heroes } from "../../../../utils/heroes";


export default (req:NextApiRequest, res:NextApiResponse) => {

        const {method} = req
        const heroesList:any = [];

        switch(method){
            case "GET":
                heroes.forEach((hero) => {
                    heroesList.push(hero.name)
                })
        
                JSON.stringify(heroesList);

                res.status(200).json({ heroesList })

            default: 
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
        }

        


}
