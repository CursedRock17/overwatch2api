import { useState } from "react";

import { auth, database } from "../../Firebase/FirebaseInit";
import { setDoc, arrayUnion, doc } from "firebase/firestore";

import styles from "./Users.module.css"
import usePaginateArray from "../../CustomHooks/usePaginateArray";

//Going to pass much of what I have as props

export const UsersList = (props:any) => {
    const [pageNum, setPageNum] = useState<number>(1);
    const perPage = 3;

    const changePage = (event:any) => {
        setPageNum(Number(event.target.id))
    }
    const currentUsers = usePaginateArray(pageNum, perPage, props.finalList)

    const listedUsers = currentUsers.map((item:any) =>
    <tr key={item.Id}>
       <td>{item.Username}</td>
       <td>{item.DPS}</td>
       <td>{item.Tank}</td>
       <td>{item.Support}</td>
       <td>{item.Online == true ? "Online" : "Offline"}</td>
       <td>{item.Microphone == true ? "Microphone" : "No Microphone"}</td>
       <td>{item.Playstyle}</td>
       <td>{item.Region}</td>
       <td>
         <DropMenu>
            <HeroMenu Heroes={item.Heroes}></HeroMenu>
         </DropMenu>  
       </td>
       {
       item.Id != null ?
       <td><a href="#"
          onClick={(e) => handleInvite(item.Id, e)}>Send Invite</a>
       </td> :
       <></>
       }
    </tr>
    );

    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.finalList.length / perPage); i++) {
        pageNumbers.push(i)
        if (i == 20) i = Math.ceil(props.finalList.length / perPage)
    }

    const renderPageNums = pageNumbers.map((pageNum:number) => 
        <li
        key={pageNum}
        id={String(pageNum)}
        onClick={changePage}
        className={styles.pageButton}
        >
        {pageNum}
        </li>
    )

    const handleInvite = async(rec:string, e:any) => {
        e.preventDefault();
        const sender = auth.currentUser

        if(rec && sender){
            try {
            const date = new Date()
            await setDoc(doc(database, "fillAUser", rec), {
             Invites: arrayUnion(sender?.displayName + " Wants to play on: " + date)
          }, {merge: true})
        } catch(error) {
          console.log(error)
          }
        }
    }

    return (
        <div>
        {listedUsers.length > 0 ?
        <>
      <table className={styles.contentTable}>
         <thead>
            <tr>
               <th>Username</th>
               <th>DPS</th>
               <th>Tank</th>
               <th>Support</th>
               <th>Online </th>
               <th>Microphone</th>
               <th>Playstyle</th>
               <th>Region</th>
               <th>Heroes</th>
               <th>Invite</th>
            </tr>
         </thead>
         <tbody>
           {listedUsers}
        </tbody>
      </table> 
      <div>
        <ul className={styles.pageNums}>
            {renderPageNums}
        </ul>
     </div> 
     </>
     : 
     <p className={styles.NoResults}> Please Refactor Search Filters</p>
        }
    </div>
    )
}

const DropMenu = (props:any) => {
    const [open, setOpen] = useState<boolean>(false)
 
    return (
       <a href="#" onClick={() => setOpen(!open)}>
          <p className={styles.ViewText}> View </p>
          {open && props.children}
       </a>
    )
 }
 
 const HeroMenu = (props:any) => {
 
    const totalHeroes:Array<string> = []
 
    for(var key in props.Heroes){
       totalHeroes.push(key);
    }
 
    const mappedHeroes = totalHeroes.map((idx:string) => 
          <li className={styles.indexTag}>
             {idx}
          </li>
    )
 
    return (
       <div className={styles.HeroesTable}>
          <ul className={styles.indexTag}>
             {mappedHeroes}
          </ul>
       </div>
    )
 }

export default UsersList