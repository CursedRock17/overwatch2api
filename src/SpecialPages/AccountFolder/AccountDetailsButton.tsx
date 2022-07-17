import { useContext } from "react";
import { DetailsContext } from "../../Context/detailsContext";
import styles from './AccountStyles/styles.module.css'

import { auth } from "../../Firebase/FirebaseInit";
import { setDoc, doc } from "firebase/firestore";
import { database } from "../../Firebase/FirebaseInit";

export const AccountDetailsButton = (props:any) => {

    //Known things before the process, we just grab these from their respective files
    //They have to be known globally in order for a user to do anything
    const user = auth.currentUser;
    const detailsContext = useContext(DetailsContext)


    const submitChanges = async() => {
        //going to need to connect to firebase
        let errors = 0;

        //All of these sections need to check if their null before checking values
        if(detailsContext.userDetails?.DPS){
            if(detailsContext.userDetails?.DPS < 0 || detailsContext.userDetails?.DPS > 9999 ){
                props.setErrors("DPS SR is out of range")
                errors++;
            }   
        }

        if(detailsContext.userDetails?.Tank){
            if(detailsContext.userDetails?.Tank < 0 || detailsContext.userDetails?.Tank> 9999 ){
                props.setErrors("Tank SR is out of range")
                errors++;
            }
        }

        if(detailsContext.userDetails?.Support){
            if(detailsContext.userDetails?.Support < 0 || detailsContext.userDetails?.Support> 9999 ){
                props.setErrors("Support SR is out of wrong")
                errors++;
            }
        }

        if(errors == 0){
            props.setErrors("Clear")
            /* 
            Each setDoc requires three things, database, the name of the collection, then where we 
            add the stuff to. This third item should relate the autenticated uuid so it saves progress
            We need to set merge to true so we override the data that's already in the collection with
            data relevant to the change. 

            We simply just need to loop through the parts of the objects using keys then pass those keys
            singly to the function so overrides what actually needs to change

            --Ignore the Linter, it just implies type any
            */

            if(user){
                for(var key in detailsContext.userDetails){
                    try {
                        await setDoc(doc(database, "fillAUser", user.uid), {
                          [key]: detailsContext.userDetails[key], 
                        }, {merge: true});
                    } catch (e) {
                        console.log("Error is: ", e)
                    }
                }
            }

            window.location.reload();
        }
    }
    
    return (
        <button
        className={styles.updateProfile}
        onClick={() => submitChanges()}
        >
        Update Profile
        </button>
    )
}

export default AccountDetailsButton;