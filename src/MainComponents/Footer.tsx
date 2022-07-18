import React from 'react'
import styles from './MainCompStyles/styles.module.css'

import Image from 'next/image'
import GitIcon from "../../public/Pictures/github.svg"

//Attempt to switch to nicer symbols and useful links
export const Footer = () => {
    return (
    <div className={styles.Footer}>
        <h1>
            Fill A Role
        </h1>
        <a target="_blank" href="https://github.com/CursedRock17?tab=projects&type=beta" className={styles.FooterText}>
            <Image src={GitIcon}></Image>
        </a>
        <h1>
            Policy Page
        </h1>
    </div>
    )
}

export default Footer;
