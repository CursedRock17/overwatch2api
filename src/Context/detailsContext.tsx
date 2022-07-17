import { createContext, useState } from "react";
import { Chars, UserDetails, DetailsContextProps, DetailsContextType } from '../Types/UserTypes' 

export const DetailsContext = createContext<DetailsContextType>({} as DetailsContextType);

export const DetailsContextWrapper = ({ children }: DetailsContextProps) => {
    const [userDetails, setUserDetails] = useState<UserDetails>({} as UserDetails);

    return (
        <>
            <DetailsContext.Provider value={{ userDetails, setUserDetails }}>
                {children}
            </DetailsContext.Provider>
        </>
    )
}

//We needed context ot scale latterly and might be useful for other
//reasons we may need sign-in information in the app
//Previosuly i tried to work it back up, but it caused rerenders
