import React, { createContext, useState } from "react";


type SignInDetails = {
    Email: string,
    Password: string, 
    Confirm: string
}

type AccountContextProps = {
    children: React.ReactNode
}

type AccountContextType = {
    signInInput: SignInDetails | null,
    setSignInInput: React.Dispatch<React.SetStateAction<SignInDetails | null>>
}

export const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountContextWrapper = ({ children }: AccountContextProps) => {
    const [ signInInput, setSignInInput ] = useState<SignInDetails | null>(null);

    return (
        <>
            <AccountContext.Provider value={{ signInInput, setSignInInput }}>
                {children}
            </AccountContext.Provider>
        </>
    )
}

//We needed context ot scale latterly and might be useful for other
//reasons we may need sign-in information in the app
//Previosuly i tried to work it back up, but it caused rerenders
