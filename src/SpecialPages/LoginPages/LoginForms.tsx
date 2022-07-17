import React, { useContext} from "react";
import { AccountContext } from "../../Context/accountContext";
import styles from './LoginStyles/styles.module.css'

export const LoginForm = (props:any) => {

const accountContext = useContext(AccountContext);

const handleChange = (name:string, value:string) => {
        accountContext.setSignInInput({
            ...accountContext.signInInput,
            [name]: value
        } as any)
}

const name:string = props.display

    return (
    <div className={styles.LoginForm}>
        <p className={styles.LoginHead}> {name}</p>
        <input
        type="text"
        placeholder={name}
        onChange={(val) => handleChange(name, val.target.value)}
        className={styles.LoginInputs}
        >
        </input>
    </div>
    )
}

export default LoginForm;