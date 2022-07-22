import {useContext, useState, useEffect} from "react";
import { DetailsContext } from "../../../Context/detailsContext";
import styles from '../AccountStyles/styles.module.css'

import { auth, database } from "../../../Firebase/FirebaseInit";
import { doc, getDoc } from "firebase/firestore";

import Image from "next/image";


export const HeroSelect = () => {
    const[currentSetting, setCurrentSetting] = useState([])

    const user = auth.currentUser;

    const grabUser = async() => {
        if(user){
            const userRef = doc(database, "fillAUser", user.uid);
            const docRef = await getDoc(userRef)
    
            if(docRef.exists()){
                setCurrentSetting(docRef.data()?.Heroes)
            }
            else {}
        }
    }

    useEffect(() => {
        grabUser();
    }, [])


    //Needed to convert the object to a Array in order to map out the characters
    const chars = [];
    for(var hero in currentSetting){
        if(currentSetting[hero] == true){
            chars.push(hero);
        }
    }

    const herosMap = chars.map((hero:string) => 
    <li key={hero}>
       <p className={styles.listItem}> {hero} </p> 
    </li>
)

    return (
        <>
        <ul className={styles.mappedHeroes}>{herosMap}</ul>
        <div className={styles.heroWrapper}>
            <HeroTemplate hero="Ana"/>
            <HeroTemplate hero="Ashe" />
            <HeroTemplate hero="Baptiste" />
            <HeroTemplate hero="Bastion" />
            <HeroTemplate hero="Brigitte" />
            <HeroTemplate hero="Cassidy" />
            <HeroTemplate hero="DVa" />
            <HeroTemplate hero="Doomfist" />
            <HeroTemplate hero="Echo" />
            <HeroTemplate hero="Genji" />
            <HeroTemplate hero="Hanzo" />
            <HeroTemplate hero="Junkrat" />
            <HeroTemplate hero="Lucio" />
            <HeroTemplate hero="Mei" />
            <HeroTemplate hero="Mercy" />
            <HeroTemplate hero="Moira" />
            <HeroTemplate hero="Orisa" />
            <HeroTemplate hero="Pharah" />
            <HeroTemplate hero="Reaper" />
            <HeroTemplate hero="Reinhardt" />
            <HeroTemplate hero="Roadhog" />
            <HeroTemplate hero="Sigma" />
            <HeroTemplate hero="Soldier-76" />
            <HeroTemplate hero="Sombra" />
            <HeroTemplate hero="Symmetra" />
            <HeroTemplate hero="Torbjorn" />
            <HeroTemplate hero="Tracer" />
            <HeroTemplate hero="Widowmaker" />
            <HeroTemplate hero="Winston" />
            <HeroTemplate hero="Wrecking Ball" />
            <HeroTemplate hero="Zarya" />
            <HeroTemplate hero="Zenyatta" />
        </div>
        </>
    )
}


const HeroTemplate = (props:any) => {
    const [didSelect, setDidSelect] = useState<string>("portrait");

    const detailsContext = useContext(DetailsContext)
    //if the characters is already favorited on load
    //make sure to set state that way too

    const heroSelected = (character:string) => {


        if(didSelect == "portrait"){
            setDidSelect("selected")
            detailsContext.setUserDetails({
                ...detailsContext.userDetails,
                Heroes: {
                    ...detailsContext.userDetails?.Heroes,
                    [character]: true,
                } 
            } as any)
        }
        else {
            setDidSelect("portrait")
            detailsContext.setUserDetails({
                ...detailsContext.userDetails?.Heroes,
                Heroes: {
                    [character]: false
                } 
            } as any)
        }
    }

    //Going to make these stores in the pictures section
    const link = "/Pictures/Characters/" + props.hero + ".png"

    return (
        <>
        <button
        className={didSelect == "portrait" ? styles.portrait : styles.selected}
        onClick={() => heroSelected(props.hero)}
        >
            {props.hero}
            <Image className={styles.heroImage} src={link} width={70} height={100}></Image>
        </button>
        </>
        
    )
}
export default HeroSelect;