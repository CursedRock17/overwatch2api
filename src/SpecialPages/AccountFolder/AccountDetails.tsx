import {  useState } from "react";
import {  DetailsContextWrapper } from "../../Context/detailsContext";
import AccountDetailsButton from "./AccountDetailsButton";
import styles from './AccountStyles/styles.module.css'
import AccountTextForm from "./AccountForms/AccountTextForm";

import PlaystyleInput from "./AccountForms/PlaystyleInput";
import RegionInput from "./AccountForms/RegionInput";
import HeroSelect from "./AccountForms/HeroSelect";
import AccountInvites from "./AccountForms/AccountInvites"

export const AccountDetails = () => {
    /*Need to create some filters that
    link to a user's uuid things like characters
    rank, status, age, etc.

    In there we need some sort of update Profile button
    which will update this stuff in a firestore so we can
    query it later
    */
    const [ currentError, setCurrentError] = useState<string>("Clear")

    const createErrors = (error:string) => {
        setCurrentError(error);
    }

    return (
    <DetailsContextWrapper>
        <div className={styles.mainAccountDetails}>
            <div className={styles.accountDetailsFormArea}>
                {
                    currentError != "Clear"
                    ?
                    <div className={styles.errorMessage}>
                       <h3 className={styles.wrongThing}> {currentError} </h3>
                    </div>
                    : <></>
                }
                <div className={styles.subsection}>
                    <h1 className={styles.basicHead}> Invites: </h1>
                    <AccountInvites />
                </div>
                <div className={styles.subSection}>
                    <h1 className={styles.basicHead}>SR(Tank): </h1>
                    <AccountTextForm title="Tank" type="number" max="9999" min="1"/>
                    <h1 className={styles.basicHead}>SR(DPS): </h1>
                    <AccountTextForm title="DPS" type="number" max="9999" min="1"/>
                    <h1 className={styles.basicHead}>SR(Support): </h1>
                    <AccountTextForm title="Support" type="number" max="9999" min="1"/> 
                </div>
                <div className={styles.subSection}>
                    <h1 className={styles.basicHead}>Online: </h1>
                    <AccountTextForm title="Online" type="checkbox" />
                    <h1 className={styles.basicHead}>Microphone: </h1>
                    <AccountTextForm title="Microphone" type="checkbox" />
                    <h1 className={styles.basicHead}>Username: </h1>
                    <AccountTextForm title="Username" type="text" />
                </div>
                <div className={styles.subSection}>
                    <h1 className={styles.basicHead}>Region: </h1>
                    <RegionInput />
                    <h1 className={styles.basicHead}>Preferred Playstyle: </h1>
                    <PlaystyleInput />
                    <h1 className={styles.basicHead}>Best Heroes: </h1>
                    <HeroSelect />
                </div>
            </div>
        </div>
        <div className={styles.updateWrapper}>
        <AccountDetailsButton setErrors={(error:string) => createErrors(error)} />
        </div>
    </DetailsContextWrapper>
    )
}

export default AccountDetails;