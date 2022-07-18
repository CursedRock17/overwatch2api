import React from 'react'
import styles from './MainCompStyles/styles.module.css'

import Image from 'next/image'

import DefeatScreen from "../../public/Pictures/DefeatScreen.jpeg"
import BlizChars from "../../public/Pictures/BlizCharacters.jpeg"
import SelectScreen from "../../public/Pictures/OverwatchSelectScreen.jpeg"
import NoSmoke from "../../public/Pictures/NoSmoke.jpeg"
import Win from "../../public/Pictures/Win.jpeg"
import DatePic from "../../public/Pictures/Date.jpeg"
import TeamKill from "../../public/Pictures/TeamKill.jpeg"

//with different colors, images, and sizes
//Can't really use DRY here because we want a differnet flow 

export const Body = () => {
    return (
    <div className={styles.Body}>
        <h1 className={styles.BodyHeader}>
            The Stuggle
        </h1>
        <div className={styles.Split}>
        <p className={styles.BodyText}>
            The solo queue grind has been a constant struggle <br />
            that many gamers go through and as a result it <br />
            brings many defeats. Many games follow these same <br />
            ideas, but games such as Overwatch heavily focus on teamwork. 
            Without proper communication and roles the odds of a 
            loss are much higher than that of a win.
        </p>
        <Image src={DefeatScreen} className={styles.defImage}></Image>
        </div>

        <Image src={BlizChars} className={styles.FullImage}></Image>
        <h1 className={styles.BodyHeader}>
            Characters
        </h1>
        <div className={styles.Split}>
        <Image src={SelectScreen} className={styles.defImage}></Image>
        <p className={styles.BodyText}>
            When playing video games there's always a meta to follow.
            Many times the meta isn't the characters that you want to play,
            this leads to the game being not fun. It's even less fun when the 
            characters don't work together, therefore ending a loss.
        </p>
        </div>

        <h1 className={styles.BodyHeader}>
            The Objectives
        </h1>
        <div className={styles.general}>
        <a target="_blank" href="https://icons8.com/icon/iojFFfD8F9SP/no-smoke"> <Image src={NoSmoke}></Image> </a>
        <p>
            Create a nontoxic and efficient environment
        </p>
        <a target="_blank" href="https://icons8.com/icon/23549/best-seller"> <Image src={Win}></Image></a>
        <p>
            Ensure you pick the best people for your gameplan
        </p>
        <a target="_blank" href="https://icons8.com/icon/12776/calendar"> <Image src={DatePic}></Image> </a>
        <p>
            Keeping up to date on the most effective tactics
        </p>
        </div>

        <h1 className={styles.BodyHeader}>
            The Fix
        </h1>
        <div className={styles.Split}>
        <p className={styles.BodyText}>
            In order to combat these issues and follow through with out objectives
            this site was created. With this site, you can easily input your most played
            characters, ranking, and other important filters to allow for easy searching. On
            the flip side, you can filter out certain options in order to find online players
            most likely to engage with your style of gameplay.
        </p>
        <Image src={TeamKill} className={styles.defImage}></Image>
        </div>
    </div>
    )
}

//Transitions are going to be key with this type of website

export default Body;
