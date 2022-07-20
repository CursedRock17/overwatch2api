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
import { onAuthStateChanged, User } from 'firebase/auth'

import { nanoid } from 'nanoid'


const GroupPage:NextPage = () => {
    const [groupDetails, setGroupDetails] = useState<GroupType>({} as GroupType);
    const [createDetails, setCreateDetails] = useState<GroupType>({Rank: "Bronze", Microphone:false, Region: "Unset", Playstyle: "Anything", SupportOne: "", SupportTwo:"", TankOne: "",  TankTwo: "", DPSOne: "", DPSTwo: "", Gamemode: "Quick Play" } as GroupType)
    const [currentUser, setCurrentUser] = useState<User>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user && !currentUser) {
                setCurrentUser(user);
            }
          });
    }, [])

    const navigate = useRouter();

    const removeField = async(index:number, collectionRef:any) => {

        const GroupsArray = await getDoc(collectionRef);

        if(GroupsArray.exists()){
            const currentGroup = GroupsArray.data().Groups[index]

            await updateDoc(collectionRef, {
                Groups: arrayRemove(currentGroup)
            }, {merge: true})
        }

        navigate.push("/")

    }

    const handleSubmit = async() =>{
        if(currentUser){
            const usersGroups = doc(database, "fillAUser", currentUser.uid)
            const date = new Date();

            const groupRef = getDoc(usersGroups);
            const userGroupDates = (await groupRef).data()?.Groups

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
                    DPSOne: createDetails.DPSOne,
                    DPSTwo: createDetails.DPSTwo,
                    TankOne: createDetails.TankOne,
                    TankTwo: createDetails.TankTwo,
                    SupportOne: createDetails.SupportOne,
                    SupportTwo: createDetails.SupportTwo,
                    UserId: currentUser.uid
                }

                if(groupInfo.DPSOne != "" || groupInfo.TankOne != "" || groupInfo.SupportOne != ""){
                    try {
                        await setDoc(usersGroups, {
                            Groups: arrayUnion(groupInfo)
                        }, {merge: true})
                        navigate.push("/")
                    } catch (error){}
                } else {
                    setErrorMessage("Must Select a Role")
                }
            }
        }

    }   


    
    const handleFilter = (title:string, e:any, type:string) => {
        //Have to change the title to not have space
        //Just took some Regex from StackOverflow
        title = title.replace(/\s/g, '');

        if(type == "Search"){
            if(title == "Microphone")
            {
            setGroupDetails({
                ...groupDetails,
                [title]: !groupDetails?.[title]
            } as any)   
            }
    
            else if(title == "DPSOne" || title == "TankOne" || title == "SupportOne"){
                setGroupDetails({
                    ...groupDetails,
                    DPSOne: "",
                    DPSTwo: "",
                    TankOne: "",
                    TankTwo: "",
                    SupportOne: "",
                    SupportTwo: "",
                    [title]: currentUser?.displayName
                } as any)  
            }
    
            else {
            setGroupDetails({
                ...groupDetails,
                [title]: e
            } as any)
          }
        } 
        
        else {
            if(title == "Microphone")
            {
            setCreateDetails({
                ...createDetails,
                [title]: !createDetails?.[title]
            } as any)   
            }
    
            else if(title == "DPSOne" || title == "TankOne" || title == "SupportOne"){
                setCreateDetails({
                    ...createDetails,
                    DPSOne: "",
                    DPSTwo: "",
                    TankOne: "",
                    TankTwo: "",
                    SupportOne: "",
                    SupportTwo: "",
                    [title]: currentUser?.displayName
                } as any)  
            }
    
            else {
            setCreateDetails({
                ...createDetails,
                [title]: e
            } as any)
          }
        } 
    }

    const handleSearch = () => {
        //Begin the query of groups following the search logic
        let addedString:string = "Groups/GroupResults?"
        let canFilter = false;

        for(const key in groupDetails){
            addedString = addedString + (`${key}=`) + groupDetails[key] + "&";
            if(key == "DPSOne" || key == "TankOne" || key == "SupportOne") canFilter = true;
        }

        if(canFilter){
            navigate.push(addedString)
        } else {
            setErrorMessage("Must Select a Role")
        }

    }

    return (

    <div className={styles.top}>
        <Navbar />
            <CurrentGroups currentUser={currentUser} deleteField={removeField}/>
            <div className={styles.searchHeader}>
                Create a Group
            </div>
            {
            errorMessage ? 
            <div className={styles.errorMessage}>
                <div className={styles.subsectionSR}>
                   <p> {errorMessage} </p> 
                </div>
            </div>
            :
            <></>
            }
            <GroupFilters currentUser={currentUser} handleChange={(title:string, e:any) => handleFilter(title, e, "Create")} handleSubmit={handleSubmit}/>

            <div className={styles.searchHeader}>
                    Begin Search
            </div>
            <GroupFilters currentUser={currentUser} handleChange={(title:string, e:any) => handleFilter(title, e, "Search")} handleSubmit={handleSearch}/>
        <Footer />
        <div className={styles.filler}></div>
    </div>
    )
}


const GroupFilters = (props:any) => {

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
                        <div onChange={(e:any) => props.handleChange(e.target.value, props.currentUser?.displayName)}>
                        DPS
                        <input
                        type="radio"
                        value="DPSOne"
                        name="role"
                        />
                        Tank
                        <input
                        type="radio"
                        value="TankOne"
                        name="role"
                        />
                        Support
                        <input
                        type="radio"
                        value="SupportOne"
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

const CurrentGroups = (props:any) => {
    const [listedGroups, setListedGroups] = useState<Array<GroupType>>([]);

    

    /*
Need to simple fetch te gorups under our current user so that they can be displayed
using a useEffect hook they will be called on render then mapped out in a list, the
forEach loop shouldn't be a problem because there should only be three items int eh list
    */

    const fetchGroups = async() => {
        if(props.currentUser){
            const usersGroups = doc(database, "fillAUser", props.currentUser.uid)
            const groupRef = await getDoc(usersGroups);

            if(groupRef.exists()){
                groupRef.data()?.Groups.forEach((group:GroupType) => {
                    setListedGroups(oldArray => [
                        ...oldArray,
                        group
                    ])
                })
            }
        }
    } 

    useEffect(() => {
        fetchGroups()
    }, [props.currentUser])


    const personalMappedGroups = listedGroups.map((group:GroupType, index:number) =>
        <ul key={index} className={styles.groupStyle}>
            <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Gamemode: {group.Gamemode} </p>
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Playstyle: {group.Playstyle}</p>
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Rank: {group.Rank}</p>
                    </div>
            </div>

            <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> Region: {group.Region} </p>
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Microphone: {String(group.Microphone)}</p>
                    </div>
            </div>
            <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <p> DPS: {group.DPSOne}  </p>
                        <p> DPS: {group.DPSTwo}  </p>
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Tank: {group.TankOne} </p>
                        <p> Tank: {group.TankTwo} </p>
                    </div>
                    <div className={styles.subsectionsrsub}>
                        <p> Support: {group.SupportOne}</p>
                        <p> Support: {group.SupportTwo}</p>
                    </div>
            </div>
            <div className={styles.subsectionSR}>
                    <div className={styles.subsectionsrsub}>
                        <button
                        onClick={() => props.deleteField(index, doc(database, "fillAUser", props.currentUser.uid))}
                        className={styles.deleteField}
                        >
                        <p> Delete </p>
                        </button>
                    </div>
            </div>
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

