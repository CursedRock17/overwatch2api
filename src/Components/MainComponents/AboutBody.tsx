import React from 'react'
import styles from "../../styles/About.module.css"

class AboutBody extends React.Component {
    render(): React.ReactNode {
        return (
            <div className={styles.MainBody}>
                <h1 className={styles.headerFont}> About </h1>

                <p className={styles.InfoPara}>
                    This is a completely open-source API which allows developers to make requests 
                    and grab information about Overwatch 2. Currently the main focus is all about the 
                    heroes and their abilies, damage, etc. For characters, if the ability is a distance
                    the number is always in meters, if it is a time the number is always in seconds
                </p>
            </div>
        )
    }
}

export default AboutBody