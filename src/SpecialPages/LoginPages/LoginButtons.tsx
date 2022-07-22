import React, { useContext } from "react";
import styles from './LoginStyles/styles.module.css'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, database } from '../../Firebase/FirebaseInit'
import { AccountContext } from "../../Context/accountContext";
import { doc, setDoc } from "firebase/firestore";

import { useRouter } from "next/router";

export const LoginButton = (props:any) => {

    const accountContext = useContext(AccountContext);
    const navigate = useRouter();


    const SignIn = async(email:string, password:string) => {

        if(password != null && email != null){
            if(password.length < 8 && password !=null || password.length > 25){
                props.setErrors("doesn't fit size")
            }
        }
        else {
            props.setErrors("Please fill out all the forms")
        }


        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
            props.setErrors("Clear");
            navigate.push("/Account")
        })
        .catch((error) => {
            props.setErrors(error.code)
        });
    
    }
    
    const SignUp = async(email: string | null, password: string, confirm: string) => {
    
        if(password != null || email != null){
            if(password.length < 8 || password.length > 25){
                props.setErrors("Doesn't Fit Size")
            }
        }
        else {
            props.setErrors("Please fill out all the forms")
        }

        if(password != confirm){
            props.setErrors("Password Must Equal Confirmation")
        }
    
    
        await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        props.setErrors("Clear");
        createRandomUser();
        setId();

        //Todo: Change to real domain
        navigate.push("/Account")
      })
      .catch((error) => {
        props.setErrors(error.code)
      });
    
        //Route Back to Home or Account
    
    }

    const createRandomUser = () => {
        //We need to give all users a new Username when
        //they start, so it'll just be random until we hit one that hasn't been used
        let rando = "user";
        const rand = Math.random().toString().substr(2, 10);
        rando = rando + rand;
        const user = auth.currentUser

        if(user){
            updateProfile(user, {
                displayName: rando
            }).then(() => {
                setUser(rando);
            })
        }
    }

    const setUser = async(random:string) => {
        const user = auth.currentUser

        if(user){
            try {
                await setDoc(doc(database, "fillAUser", user.uid), {
                  Username: random, 
                }, {merge: true});
            } catch (e) {
                console.log("Error is: ", e)
            }
        }
    }

    const setId = async() => {
        const user = auth.currentUser

        if(user){
            try {
                await setDoc(doc(database, "fillAUser", user.uid), {
                  Id: user.uid, 
                }, {merge: true});
            } catch (e) {
                console.log("Error is: ", e)
            }
        }
    }

    const AuthenFunc = (name: string, email:string, pass:string, confirm:string) => {
        if(name == "Log In"){
            SignIn(email, pass);
        }
        else if(name == "Sign Up"){
            SignUp(email, pass, confirm);
        }
    }

    return (
        <button 
        className={styles.LogAllIn}
        onClick={() => AuthenFunc(
            props.ButtonName, 
            accountContext.signInInput?.Email,
            accountContext.signInInput?.Password,
            accountContext.signInInput?.Confirm
            )}
        >
        <p> {props.ButtonName} </p>    
        </button>  
    )
}


export default LoginButton;