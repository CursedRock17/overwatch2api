import { useState } from "react";
import styles from './SearchPagesStyles/styles.module.css'

import Footer from "../../MainComponents/Footer";
import Navbar from "../../MainComponents/NavBar";
import TextInput from "./BetweenText";
import CheckboxInput from "./Checkbox";
import {DropdownInputPlaystyle , DropdownInputRegion } from "./Dropdown";

import { QueryType } from "../../Types/UserTypes";
//Need to have filters connecting to the API for this page
//It'l be a search bar that queries through the people
import { useRouter } from "next/router";

export const Search = () => {


    //No need to set basic types because it'll interfere with
    //Basic searches

    const [queryDetails, setQueryDetails] = useState<QueryType>({} as QueryType);
    const [errorMesage, setErrorMessage] = useState<string> ("")


    const navigate = useRouter()


    const handleChange = (title:string, e:any) => {
        //Have to change the title to not have space
        //Just took some Regex from StackOverflow
        title = title.replace(/\s/g, '');

        if(title == "Online" || title == "Microphone")
        {
        setQueryDetails({
            ...queryDetails,
            [title]: !queryDetails?.[title]
        } as any)   
        }
        else {
        setQueryDetails({
            ...queryDetails,
            [title]: e
        } as any)
      }
    }

    const handleSubmit = () => {
        //Before we start make sure there no errors
        let passInfo = true;
        
         if(queryDetails.TankMin && queryDetails.TankMax){
            if(queryDetails.TankMin > queryDetails.TankMax){
                setErrorMessage("Tank Minimum is Greater than the Maximum")
                passInfo = false;
            }
        }

        else if(!queryDetails.TankMin && queryDetails.TankMax || queryDetails.TankMin && !queryDetails.TankMax){
            setErrorMessage("Tank Settings aren't finished")
            passInfo = false;
        }

        if(queryDetails.DPSMin && queryDetails.DPSMax){
            if(queryDetails.DPSMin > queryDetails.DPSMax){
                setErrorMessage("DPS Minimum is Greater than the Maximum")
                passInfo = false;
            }
        }

        else if(!queryDetails.DPSMin && queryDetails.DPSMax || queryDetails.DPSMin && !queryDetails.DPSMax){
            setErrorMessage("DPS Settings aren't finished")
            passInfo = false;
        }

        if(queryDetails.SupportMin && queryDetails.SupportMax){
            if(queryDetails.SupportMin > queryDetails.SupportMax){
                setErrorMessage("Support Minimum is Greater than the Maximum")
                passInfo = false;
            }
        }

        else if(!queryDetails.SupportMin && queryDetails.SupportMax || queryDetails.SupportMin && !queryDetails.SupportMax){
            setErrorMessage("Support Settings aren't finished")
            passInfo = false;
        }

        


        /*Begin the query and pagination
        Need to add these searchParams in the url
        which is better for storage and can be grabbed
        */

        if(passInfo){
            let addedString:string = "/Users?"
    
            for(const key in queryDetails){
                addedString = addedString + (`${key}=`) + queryDetails[key] + "&";
            }
    
            navigate.push(addedString)
        }
    }
    return (

        <div className={styles.top}>
            <Navbar />
            <div className={styles.searchHeader}>
                Begin Search
            </div>
            {
                errorMesage ? 
            <div className={styles.errorMessage}>
                <div className={styles.subsectionSR}>
                   <p> {errorMesage} </p> 
                </div>
            </div>
            :
            <></>
            }
            <div className={styles.queryArea}>
                <div className={styles.formArea}>
                <h1 className={styles.subsectionSR}> SR </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                    <p> DPS SR Between: </p>
                    <TextInput type="number" name="DPS Min" change={(e:any) => handleChange("DPS Min" ,e)} />
                    <TextInput type="number" name="DPS Max" change={(e:any) => handleChange("DPS Max" , e)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                    <p> Tank SR Between: </p>
                    <TextInput type="number" name="Tank Min" change={(e:any) => handleChange("Tank Min" ,e)} />
                    <TextInput type="number" name="Tank Max" change={(e:any) => handleChange("Tank Max" , e)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                    <p> Support SR Between: </p>
                    <TextInput type="number" name="Support Min" change={(e:any) => handleChange("Support Min" , e)} />
                    <TextInput type="number" name="Support Max" change={(e:any) => handleChange("Support Max" , e)} />
                    </div>
                </div>

                <h1 className={styles.subsectionSR}> Username </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Username: </p>
                        <TextInput type="text" name="Username" change={(e:any) => handleChange("Username" , e)} />
                    </div>
                </div>
                

                <h1 className={styles.subsectionSR}> Online/Mic </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Online: </p>
                        <CheckboxInput name="Online" change={(e:any) => handleChange(e , null)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Microphone: </p>
                        <CheckboxInput name="Microphone" change={(e:any) => handleChange(e , null)} />
                    </div>
                </div>

                <h1 className={styles.subsectionSR}> Region/Playstyle </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Region: </p>
                        <DropdownInputRegion change={(e:string) => handleChange("Region" , e)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Playstyle: </p>
                        <DropdownInputPlaystyle change={(e:string) => handleChange("Playstyle" , e)} />
                    </div>
                </div>


                <div className={styles.subsectionSR}>
                    <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    >
                    Submit
                    </button>
                </div>
                </div>
            </div>
            <div className={styles.searchBody}>
            </div>
            <Footer />
            <div className={styles.filler}></div>
        </div>
    )
}

export default Search;