import { NextApiRequest, NextApiResponse } from "next";
import { heroes } from "../../../../utils/heroes";


export default (req:NextApiRequest, res:NextApiResponse) => {
    res.statusCode = 200;
    const currentId:number = Number(req.query.hero_id) - 1
    const currentHero = heroes[currentId]
    
    res.json({ currentHero })
}
