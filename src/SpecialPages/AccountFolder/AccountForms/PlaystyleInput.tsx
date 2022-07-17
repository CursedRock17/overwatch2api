import  {useContext, useState, useEffect} from "react";
import styles from '../AccountStyles/styles.module.css'
import { DetailsContext } from "../../../Context/detailsContext";
import { auth, database } from "../../../Firebase/FirebaseInit";
import { doc, getDoc } from "firebase/firestore";

export const PlaystyleInput = () => {
    const detailsContext = useContext(DetailsContext)
    const[currentSetting, setCurrentSetting] = useState<string>("")

    const user = auth.currentUser;

    const grabUser = async() => {
        if(user){
            const userRef = doc(database, "fillAUser", user.uid);
            const docRef = await getDoc(userRef)
    
            if(docRef.exists()){
                setCurrentSetting(docRef.data()?.Playstyle)
            }
            else {
                console.log("Doesnt exist")
            }
        }
    }

    useEffect(() => {
        grabUser();
    }, [])

    const playStyle = (value:string) => {

        const name = "Playstyle";

        detailsContext.setUserDetails({
            ...detailsContext.userDetails,
            [name]: value
          } as any)

    }

    return (
    <>
        <h2 className={styles.currentSet}>
            {currentSetting}
        </h2>
        <select onChange={(val) => playStyle(val.target.value)} id="style" >
            <option className={styles.dropEle} value="Anything">Anything</option>
            <option className={styles.dropEle} value="Dive">Dive</option>
            <option className={styles.dropEle} value="Bunker">Bunker</option>
            <option className={styles.dropEle} value="Brawl">Brawl</option>
            <option className={styles.dropEle} value="Pirate Ship">Pirate Ship</option>
            <option className={styles.dropEle} value="Double Sniper">Double Sniper</option>
            <option className={styles.dropEle} value="Anti-Dive">Anti-Dive</option>
        </select>
    </>
    )
}

export default PlaystyleInput;