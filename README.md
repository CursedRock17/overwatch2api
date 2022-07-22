# FillARole

This is the Github repository for the FillARole next.js site which is combined with the 
overwatch2api. It's essentially one large site, but I wanted to make it public so people could
support the Overwatch 2 API.


# Overwatch 2 API:

## Current State - 

 Currently the Overwatch 2 API is the list of heroes and maps with details accordingly, the information
 I've gotten has been from the latest [Overwatch 2 Patch Notes](https://playoverwatch.com/en-us/news/patch-notes/beta)
 and the [Overwatch WIKI](https://overwatch.fandom.com/wiki/Heroes). The best way to make changes to those assuming we're
 going to get loads of new character updates as the game progresses is to follow the path - 
 [src/utils](https://github.com/CursedRock17/overwatch2api/tree/main/src/utils) then enter either the heroes.ts or maps.json
 files. 
 
 In order to utilize this information the data will need to be in some form of JSON for the endpoint, so if the file ends in 
 .ts there will be small, extra steps when creating the endpoint. This can be seen in the simple GET endpoint of api/v1/heroes
 
 ```
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
 ```
 
 
The endpoint is very simple right now, because we use Next.js it's just a route under the api section in pages. We simply import the heroes, which is located in heroes.ts and because it's in the typescript file, it's not already JSON. Therefore, after we push all the heroes from the file into an array, we will need to JSON.stringify this array so it's usable for those with the endpoint, returning a status code of 200.

## Changing the API - 

Unless you're here for extended documentation you probably want to change around the repository, mainly the API section, which
is greatly appreciated it's a community thing, helping everybody. Almost everything related the API will be let through to allow for changes, so simply make a pull request with a small description of what you're doing and it will be apporved and merged to the main branch and production. If you see something's wrong with the actual project raise an issue, but if there's an issue in something like Ana's sleep dart cooldown in the heroes.ts array, fix it I could be wrong about some of the information put in, although I did try. 

When creating new API endpoints, they should follow the same format as the original endpoints. First if needed create a new JSON file in the utils, go to pages, api, then v1 and create a new directory this is another subsection in the routing. Create a typescript file which is a function taking in requests and responses, importing the Next Types like so 

```

import { NextApiRequest, NextApiResponse } from "next";

export default (req:NextApiRequest, res:NextApiResponse) => {}

```

Then in the new route always make sure to create some for of status code as a default response, so there will always be a response for the user and some JSON data should go with it. Then you must update the documentation in the site so go to 
[src/pages/AboutAPI/documentation](https://github.com/CursedRock17/overwatch2api/tree/main/src/pages/AboutAPI/documentation)
in the index.tsx file lies the documentation part of the website. Then add two simple elements to the React file:

```
<li className={styles.EndpointsList}> Name of Your Route Here </li>

```
and 
```
<GetRequestComponent name="Name of Your Route" apiType="What the Response will return " />
```

After this process just make a Pull Request and it will be accepted


### The Website -
I used [create-t3-app](https://create.t3.gg/) to create the site with the typescript and tRPC filters, so this is a Next.js website built on typescript.
