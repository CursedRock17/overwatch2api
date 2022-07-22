import { useState } from "react";
import Navbar from "../../MainComponents/NavBar";
import Footer from "../../MainComponents/Footer";
import styles from './AccountStyles/styles.module.css'

import { onAuthStateChanged, signOut } from 'firebase/auth'
import NavButton from "../../MainComponents/NavButton";
import { auth } from "../../Firebase/FirebaseInit";
import AccountDetails from "./AccountDetails";

export const Account = () => {
    const [signedIn, setSignedIn] = useState<Boolean>(false);
    const [currentUser, setCurrentUser] = useState<string>("No Name");

    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
            setSignedIn(true);
            if(user.displayName){
                setCurrentUser(user.displayName);
            }
          // ...
        } else {
          // User is signed out
            setSignedIn(false);
        }
      });

      const TrySignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            setSignedIn(false);
          })
      }
      
    return (
        <div className={styles.top}>
            <Navbar />
            { signedIn 
                    ?
            <div className={styles.mainSection}>
            <h1 className={styles.currentName}>
               Current Account: {currentUser}
            </h1>
            <div className={styles.changeName}>
            </div>
            <AccountDetails />
            <div className={styles.signOutDiv}>
            <button
              className={styles.signOut}
              onClick={() => TrySignOut()}
              >
              Sign Out
              </button>
              </div>
            </div>
                    :
                    <div className={styles.Login}>
                    <NavButton title="Login"/>
                    </div>
                  }
            <Footer />
        </div>
    )
}


export default Account;