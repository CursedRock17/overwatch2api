import { useState } from 'react'

import styles from './LoginStyles/styles.module.css'
import Navbar from '../../MainComponents/NavBar';
import Footer from '../../MainComponents/Footer';
import LoginForm from './LoginForms';
import LoginButton from './LoginButtons';
import { AccountContextWrapper } from '../../Context/accountContext';


export const LoginPage = () => {

const [ userInfo, setUserInfo ] = useState({email: "", password: "", confirm: ""})
const [errorMessage, setErrorMessage] = useState("Clear");

const displayError = (error:string) => {
    if(error == "auth/user-not-found"){
        setErrorMessage("User Not Found"); 
    }
    else if(error == "auth/email-already-in-use"){
        setErrorMessage("Email Already Being Used");
    }
    else if(error == "auth/invalid-email"){
        setErrorMessage("Invalid Email");
    }
    else if(error == "auth/wrong-password"){
        setErrorMessage("Email or Password is Incorrect");
    }
    else if(error == "auth/user-disabled"){
        setErrorMessage("Account has been Disabled");
    }
    else if(error == "auth/weak-password"){
        setErrorMessage("Weak Password")
    }
    else if(error == "Doesn't Fit Size"){
        setErrorMessage(error);
    }
    else if(error == "Password Must Equal Confirmation"){
        setErrorMessage(error);
    }
    else if(error == "Clear"){
        setErrorMessage(error);
    }
}

    return (

        <div className={styles.top}>
            <Navbar />
            <div className={styles.section}>
                <div className={styles.EntireBox}>
                    <div className={styles.errorMessage}>
                    {
                    errorMessage != "Clear" ? 
                        <h3 className={styles.wrongThing}>
                            {errorMessage}
                        </h3>
                        :
                        <></>
                    }
                    </div>
                <AccountContextWrapper>
                    <div className={styles.SetupBox}>
                    <div className={styles.logInSide}>
                        <LoginForm title="Email" display="Email" />
                        <LoginForm title="Password" display="Password" />
                        <LoginButton ButtonName="Log In" user={userInfo.email} pass={userInfo.password} setErrors={(error:string) => displayError(error)} />
                    </div>
                    <div className={styles.signUpSide}>
                        <LoginForm title="Email" display="Email" />
                        <LoginForm title="Password" display="Password" />
                        <LoginForm title="Confirm" display="Confirm Password" />
                        <LoginButton ButtonName="Sign Up" user={userInfo.email} pass={userInfo.password} confirm={userInfo.confirm} setErrors={(error:string) => displayError(error)} />
                    </div>
                    </div>
                </AccountContextWrapper>
                </div>
            </div>
            <Footer />
            <div className={styles.filler}></div>
        </div>
    )
}

export default LoginPage;