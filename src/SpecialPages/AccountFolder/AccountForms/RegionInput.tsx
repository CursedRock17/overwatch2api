import {useContext, useState, useEffect} from "react";
import styles from '../AccountStyles/styles.module.css'
import { DetailsContext } from "../../../Context/detailsContext";

import { auth, database } from "../../../Firebase/FirebaseInit";
import { doc, getDoc } from "firebase/firestore";

export const RegionInput = () => {
    const detailsContext = useContext(DetailsContext)
    const[currentSetting, setCurrentSetting] = useState<string>("")

    const user = auth.currentUser;

    const grabUser = async() => {
        if(user){
            const userRef = doc(database, "fillAUser", user.uid);
            const docRef = await getDoc(userRef)
    
            if(docRef.exists()){
                setCurrentSetting(docRef.data()?.Region)
            }
            else {}
        }
    }

    useEffect(() => {
        grabUser();
    }, [])


    const RegionSet = (value:string) => {

        const name = "Region";

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
    <select onChange={(val) => RegionSet(val.target.value)} id="region" >
        <option className={styles.dropEle} value="Unset">Unset</option>
        <option className={styles.dropEle} value="Eastern Asia">Eastern Asia</option>
        <option className={styles.dropEle} value="Western Asia">Western Asia</option>
        <option className={styles.dropEle} value="Oceania">Oceania</option>
        <option className={styles.dropEle} value="Eastern Europe">Eastern Europe</option>
        <option className={styles.dropEle} value="Central Europe">Central Europe</option>
        <option className={styles.dropEle} value="Western Europe">Western Europe</option>
        <option className={styles.dropEle} value="West North America">West North America</option>
        <option className={styles.dropEle} value="Central North America"> Central North America</option>
        <option className={styles.dropEle} value="East North America">East North America</option>
        <option className={styles.dropEle} value="South America">South America</option>
        <option className={styles.dropEle} value="Extra">Extra</option>
    </select>
    </>
    )
}

export default RegionInput;