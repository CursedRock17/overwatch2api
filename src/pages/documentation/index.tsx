import type { NextPage } from "next";
import Navbar from "../../Components/MainComponents/Navbar";
import { useState } from "react";

import { heroes } from "../../utils/heroes";


const DocumentPage:NextPage = () => {

    const heroIndex = heroes.map((index) => 
        <ul>
           {index.name} : {index.id}
        </ul>
    )

    return (
        <div>
            <Navbar />
            <div className="DocsBody">

            <h1 className="TopHeader"> How to Use</h1>
            <h2 className="TopHeader"> Base API Request: http://localhost:3000/api/v1/</h2>
            <h2 className="TopHeader"> Requests </h2>
            <p> Requests should be made with the Accept: application/json header set. 
            Although you'll still receive a valid JSON response when this header is not set, any error messages will be formatted in HTML as you haven't explicity requested a JSON response. 
            Additionally, the API only supports GET requests all other methods will fail.
            </p>

            <h2 className="TopHeader">Endpoints</h2>
            
            <ul>
                <li className="EndpointsList">api/v1/hero/[hero_id]</li>
                <li className="EndpointsList">api/v1/hero/[hero_id]/abilities</li>
            </ul>

            <GetRequestComponent name="api/v1/hero/[hero_id]" apiType="hero" />

            <h3> Each Hero Id: </h3>
            {heroIndex}

            <style>
            {`
            .DocumentationHeader:hover {
              text-shadow: 0 0 5px yellow;
              cursor: pointer;
            }
            .DocsBody {
                background: linear-gradient(rgb(26, 109, 255) -0.42%, rgb(200, 34, 255) 100.42%);
                color: #7DF9FF;
                padding: 15px;
            }
            .TopHeader {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
            .EndpointsList {
                margin-bottom: 10px;
                font-size: 18px
            }
            `}
          </style>
            </div>
        </div>
    )
}

const GetRequestComponent = (props:any) => {
    const [ apiRoute, setApiRoute ] = useState<string | null>("");
    const [ jsonData, setJsonData ] = useState() 

    const fetchTest = async() => {
        if(apiRoute){
            const result = await fetch(apiRoute)
            const data = await result.json();
            setJsonData(data);
            return data;
        }

        return null;
    }

    return (
        <div>
            <h1> {props.name} -  </h1>
            <p> Returns a {props.apiType} in JSON </p>
            <input
            onChange={(e) => setApiRoute(e.target.value)}
            >
            </input>
            <button
            onClick={fetchTest}
            >
                Fetch Test
            </button>
            <div className="jsonbackground">
              <pre className="codeBlock"> {JSON.stringify(jsonData, null, 2)} </pre>
            </div>
            <style>{`
            .jsonbackground {
                background: rgba(255, 255, 255, 0.2);
                border-radius: 4px;
                box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.3);
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                font-size: 90%;
                height: 100%
            }
            .codeBlock {
                display: block;
                padding: 1rem 1.5rem;
                white-space: pre;
                overflow: hidden;
            }
            `}</style>
        </div>
    )
}

export default DocumentPage
