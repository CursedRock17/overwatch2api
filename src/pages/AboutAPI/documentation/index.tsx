import type { NextPage } from "next";
import Navbar from "../../../Components/MainAPIComponents/APINavbar";
import { useState } from "react";

import { heroes } from "../../../utils/heroes";

import styles from "../../../styles/Documentation.module.css"

const DocumentPage:NextPage = () => {

    const heroIndex = heroes.map((index) => 
        <ul>
           {index.name} : {index.id}
        </ul>
    )

    return (
        <div>
            <Navbar />
            <div className={styles.DocsBody}>
                
            <h1 className={styles.TopHeader}> How to Use</h1>
            <h2 className={styles.TopHeader}> Base API Request: http://localhost:3000/api/v1/</h2>
            <h2 className={styles.TopHeader}> Requests </h2>
            <p> Requests should be made with the Accept: application/json header set. 
            Although you'll still receive a valid JSON response when this header is not set, any error messages will be formatted in HTML as you haven't explicity requested a JSON response. 
            Additionally, the API only supports GET requests all other methods will fail.
            </p>

            <h2 className={styles.TopHeader}>Endpoints</h2>
            
            <ul>
                <li className={styles.EndpointsList}>/api/v1/hero/[hero_id]</li>
                <li className={styles.EndpointsList}>/api/v1/heroes </li> 
                <li className={styles.EndpointsList}>/api/v1/maps </li>
                <li className={styles.EndpointsList}>/api/v1/map/[map_id] </li>
                <li className={styles.EndpointsList}>/api/v1/ranks </li>
            </ul>

            <GetRequestComponent name="/api/v1/hero/[hero_id]" apiType="hero" />
            <GetRequestComponent name="/api/v1/heroes" apiType="list of heroes" />
            <GetRequestComponent name="/api/v1/maps" apiType="list of maps" />
            <GetRequestComponent name="/api/v1/map/[map_id]" apiType="list of maps" />
            <GetRequestComponent name="/api/v1/ranks" apiType="list of ranks" />

            <h3> Each Hero Id: </h3>
            {heroIndex}
 
            </div>
        </div>
    )
}

const GetRequestComponent = (props:any) => {
    const [ apiRoute, setApiRoute ] = useState<string | null>("");
    const [ jsonData, setJsonData ] = useState<JSON>({} as JSON) 

    const fetchTest = async() => {
        if(apiRoute){
            console.log(apiRoute)
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
            className={styles.fetchButton}
            >
                Fetch Test
            </button>
            <div className={styles.jsonbackground}>
              <pre className={styles.codeBlock}> {JSON.stringify(jsonData, null, 2)} </pre>
            </div>
        </div>
    )
}

export default DocumentPage
