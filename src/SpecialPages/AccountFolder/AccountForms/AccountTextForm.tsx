import styles from '../AccountStyles/styles.module.css'
import { useContext, useEffect, useState } from 'react'
import { DetailsContext } from '../../../Context/detailsContext'
import { auth, database } from '../../../Firebase/FirebaseInit'
import { doc, getDoc } from 'firebase/firestore'
import { updateProfile } from 'firebase/auth'

export const AccountTextForm = (props:any) => {
    const title = props.title;
    const detailsContext = useContext(DetailsContext)
    //? marks to make things optional
    const[currentSetting, setCurrentSetting] = useState<number | boolean>()

    const user = auth.currentUser;

    const grabUser = async() => {
        if(user){
            const userRef = doc(database, "fillAUser", user.uid);
            const docRef = await getDoc(userRef)
    
            if(docRef.exists()){
                setCurrentSetting(docRef.data()?.[title])
            }
            else {
                console.log("Doesnt exist")
            }
        }
    }

    useEffect(() => {
        grabUser();
    }, [])

    const changeField = (name:string, value:any) => {
        if(props.type == "checkbox"){
            detailsContext.setUserDetails({
                ...detailsContext.userDetails,
                [name]: !detailsContext.userDetails?.[name]
                } as any)
        }

        else {
            detailsContext.setUserDetails({
                ...detailsContext.userDetails,
                [name]: value
                } as any)
        }

        if(name == "Username"){
            updateProfileName(value)
        }
    }

    const updateProfileName = async(value:any) => {
        if(auth.currentUser){
         await updateProfile(auth.currentUser, {
            displayName: value
          }).catch((error) => {
            console.log(error)
          });
        }
      }

    return (
        <div>
            <h2 className={styles.currentSet}>
                {currentSetting}
                {
                 props.title == "Online"  &&  currentSetting == true &&
                    "Yes" 
                }
                {
                 props.title == "Microphone"  &&  currentSetting == true &&
                    "Yes" 
                }
                 {
                 props.title == "Online"  &&  currentSetting == false &&
                    "No" 
                }
                {
                 props.title == "Microphone"  &&  currentSetting == false &&
                    "No" 
                }
            </h2>
            <input
            type={props.type}
            className={styles.TextForm}
            placeholder={props.title}
            max={props.max}
            min={props.min}
            onChange={(val) => changeField(props.title, val.target.value)}
            >
            </input>
        </div>
    )
}

export default AccountTextForm;