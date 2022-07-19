import { useEffect, useState } from 'react'

import { NextPage } from "next";
import { useRouter } from "next/router";

import Navbar from "../../MainComponents/NavBar";
import Footer from "../../MainComponents/Footer";

import styles from "../../styles/GroupPage.module.css"

import { DropdownInputRegion, DropdownInputPlaystyle, DropdownInputRank, DropdownInputGamemode } from '../../SpecialPages/SearchPages/Dropdown';
import CheckboxInput  from "../../SpecialPages/SearchPages/Checkbox"
import { GroupType } from '../../Types/UserTypes';

import { database, auth } from '../../Firebase/FirebaseInit';
import { arrayUnion, arrayRemove, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

import { nanoid } from 'nanoid'

const GroupPage:NextPage = () => {
    const [groupDetails, setGroupDetails] = useState<GroupType>({} as GroupType);
    const [createDetails, setCreateDetails] = useState<GroupType>({Rank: "Bronze", Microphone:false, Region: "Unset", Playstyle: "Anything", Support: 0, Tank: 0, DPS: 0, Gamemode: "Quick Play" } as GroupType)

    const navigate = useRouter();

    const removeField = async(index:number, collectionRef:any) => {
        await updateDoc(collectionRef, {
            Groups: arrayRemove(index)
        })
    }

    const handleSubmit = async() =>{
        const currentUser = auth.currentUser

        if(currentUser){
            const usersGroups = doc(database, "fillAUser", currentUser.uid)
            const date = new Date();

            const groupRef = getDoc(usersGroups);
            const userGroupDates = (await groupRef).data()?.Groups

            console.log(userGroupDates)

            userGroupDates.forEach((oldDate:any, index:number) => {
                const secondsBetween = Math.round(date.getTime() / 1000) - oldDate?.Timestamp.seconds;
                
                if(secondsBetween > 86400){
                    try {
                        removeField(index, usersGroups);
                    } catch(error){}
                }
            })

            if(userGroupDates.length < 3){
                const groupInfo:GroupType = {
                    Id: nanoid(),
                    Rank: createDetails.Rank,
                    Microphone: createDetails.Microphone,
                    Region: createDetails.Region,
                    Playstyle: createDetails.Playstyle,
                    Timestamp: date,
                    Gamemode: createDetails.Gamemode,
                    DPS: createDetails.DPS,
                    Tank: createDetails.Tank,
                    Support: createDetails.Support
                }

                console.log(groupInfo)
    
                try {
                    await setDoc(usersGroups, {
                        Groups: arrayUnion(groupInfo)
                    }, {merge: true})
                } catch (error){}
        
            }
        }

        navigate.push("/")
    }   


    
    const handleFilter = (title:string, e:any, type:string) => {
        //Have to change the title to not have space
        //Just took some Regex from StackOverflow
        title = title.replace(/\s/g, '');

        if(title == "Microphone")
        {
        setGroupDetails({
            ...groupDetails,
            [title]: !groupDetails?.[title]
        } as any)   
        }

        else if(title == "DPS" || title == "Tank" || title == "Support" && type == "Create"){
            setCreateDetails({
                ...createDetails,
                DPS: 0,
                Tank: 0,
                Support: 0,
                [title]: 1
            } as any)  
        }

        else {
        setGroupDetails({
            ...groupDetails,
            [title]: e
        } as any)
      }
    }

    const handleSearch = () => {
        //Begin the query of groups following the search logic
        let addedString:string = "Groups/GroupResults?"
    
        for(const key in groupDetails){
            addedString = addedString + (`${key}=`) + groupDetails[key] + "&";
        }

        navigate.push(addedString)

    }

    return (

    <div className={styles.top}>
        <Navbar />
            <CurrentGroups />
            <div className={styles.searchHeader}>
                Create a Group
            </div>
            <GroupFilters handleChange={(title:string, e:any) => handleFilter(title, e, "Create")} handleSubmit={handleSubmit}/>

            <div className={styles.searchHeader}>
                    Begin Search
            </div>
            <GroupFilters handleChange={(title:string, e:any) => handleFilter(title, e, "Search")} handleSubmit={handleSearch}/>
        <Footer />
        <div className={styles.filler}></div>
    </div>
    )
}


const GroupFilters= (props:any) => {

    //Adding the filters ontop of the base components, just a simple form

    return (
        <div className={styles.top}>
            <div className={styles.queryArea}>
                <div className={styles.formArea}>
                <h1 className={styles.subsectionSR}> Rank </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Tier: </p>
                        <DropdownInputRank change={(e:string) => props.handleChange("Rank" , e)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Gamemode: </p>
                        <DropdownInputGamemode change={(e:string) => props.handleChange("Gamemode" , e)} />
                    </div>
                </div>
                
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Your Role </p>
                        <div onChange={(e:any) => props.handleChange(e.target.value, 1)}>
                        DPS
                        <input
                        type="radio"
                        value="DPS"
                        name="role"
                        />
                        Tank
                        <input
                        type="radio"
                        value="Tank"
                        name="role"
                        />
                        Support
                        <input
                        type="radio"
                        value="Support"
                        name="role"
                        />
                        </div>
                    </div>
                </div>

                <h1 className={styles.subsectionSR}> Microphone </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Microphone: </p>
                        <CheckboxInput name="Microphone" change={(e:any) => props.handleChange(e , null)} />
                    </div>
                </div>

                <h1 className={styles.subsectionSR}> Region/Playstyle </h1>
                <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Region: </p>
                        <DropdownInputRegion change={(e:string) => props.handleChange("Region" , e)} />
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Playstyle: </p>
                        <DropdownInputPlaystyle change={(e:string) => props.handleChange("Playstyle" , e)} />
                    </div>
                </div>


                <div className={styles.subsectionSR}>
                    <button
                    className={styles.submitButton}
                    onClick={props.handleSubmit}
                    >
                    Submit
                    </button>
                </div>
                </div>
            </div>
            <div className={styles.searchBody}>
            </div>
        </div>
    )
}

const CurrentGroups = () => {
    const currentUser = auth.currentUser;
    const [listedGroups, setListedGroups] = useState<Array<GroupType>>([]);

    /*
Need to simple fetch te gorups under our current user so that they can be displayed
using a useEffect hook they will be called on render then mapped out in a list, the
forEach loop shouldn't be a problem because there should only be three items int eh list
    */

    const fetchGroups = async() => {
        if(currentUser){
            const usersGroups = doc(database, "fillAUser", currentUser.uid)
            const groupRef = await getDoc(usersGroups);

            if(groupRef.exists()){
                groupRef.data()?.Groups.forEach((group:GroupType) => {
                    setListedGroups(oldArray => [
                        group,
                        ...oldArray
                    ])
                })
            }
        }
    } 

    useEffect(() => {
        fetchGroups()
    }, [])


    const personalMappedGroups = Object.keys(listedGroups).map((group) =>
        <ul className={styles.groupStyle}>
            {group}
        </ul>
    )

    return (
        <div>
            <div className={styles.searchHeader}>
                Current Groups
            </div>

            <div className={styles.queryArea}>
                <li className={styles.mapStyle}>
                    {personalMappedGroups}
                </li>
            </div>
        </div>
    )
}


export default GroupPage

