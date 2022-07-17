import { doc, getDoc, deleteField, updateDoc } from 'firebase/firestore'
import React from 'react'
import { auth, database } from '../../../Firebase/FirebaseInit'

class AccountInvites extends React.Component {

    inviteArray:Array<string> | never = []

    constructor(props:any){
        super(props)
        this.state = {
            updater: false,
        }
    }

    componentDidMount(){
        this.grabData()
    }

    grabData = async() => {
        const curUser = auth.currentUser

        if(curUser){
            const userDoc = doc(database, "fillAUser", curUser.uid)
            const docRef = await getDoc(userDoc)
            let index:number = 0;
            //Go through each document with a max of 5 then adding them
            //To a list which then gets rendered at the bottom
            if(docRef.exists()){
                docRef.data()?.Invites.forEach((inv:string) => {
                    index++;
                    this.inviteArray.push(inv);
                })

                if(index == 5){
                    await updateDoc(userDoc,{ 
                        Invites: deleteField()    
                    })
                }

                //This is just to cause a rerender on the specific form
                this.setState({
                    updater: true
                } as any)
            }
        }
    }

    render(): React.ReactNode {
        const mappedArray = this.inviteArray.map((inv:string) => 
        <li>
            {inv}
        </li>
        )

        return (
            <div>
                <ul>
                    {mappedArray}
                </ul>
            </div>
        )
    }
}

export default AccountInvites