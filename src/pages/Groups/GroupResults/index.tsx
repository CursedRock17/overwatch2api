import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import styles from "../../../styles/GroupPage.module.css"

import Navbar from "../../../MainComponents/NavBar";
import Footer from '../../../MainComponents/Footer';
import { GroupType } from '../../../Types/UserTypes';

import { setDoc, doc,  collection, query, limit, orderBy, getDocs, startAfter, arrayUnion } from 'firebase/firestore';
import { auth, database } from '../../../Firebase/FirebaseInit';
import { onAuthStateChanged, User } from 'firebase/auth';

import usePaginateArray from '../../../CustomHooks/usePaginateArray';
import usePages from '../../../CustomHooks/usePages';


const GroupResults:NextPage = () => {
   const [currentUser, setCurrentUser] = useState<User>();
    const [finalList, setFinalList] = useState<Array<GroupType>>([{} as GroupType]);
    
    let temporaryList:Array<GroupType> = [];
    const filterableArray:Array<GroupType> = []

    const searchParams = useRouter() 
    const userCollection = collection(database, "fillAUser");

   const setList = async() => {
                       //Setting Types
               //It's messy because you can't map these out
         //------------------------------------>
         const rank = searchParams.query.Rank
         const rankFilter = (arr:GroupType) => {
            if(!rank){
               return arr;
            }
            else if(arr.Rank && arr.Rank == rank){
               return arr;
            }
         }

         const gamemode = searchParams.query.Gamemode
         const gamemodeFilter = (arr:GroupType) => {
            if(!gamemode) return arr;
            else if(arr.Gamemode && arr.Gamemode == gamemode) return arr
         }


         const microphone = searchParams.query.Microphone
         const microphoneFilter = (arr:GroupType) => {
            if(microphone == null){
               return arr;
            }
            else if(arr.Microphone == Boolean(microphone)){
               return arr;
            }
         }

         const region = searchParams.query.Region
         const regionFilter = (arr:GroupType) => {
            if(!region) {
               return arr;
            }
            else if(arr.Region == region){
               return arr;
            }
         }

         const playstyle = searchParams.query.Playstyle
         const playstyleFilter = (arr:GroupType) => {
            if(!playstyle) {
               return arr;
            }
            else if(arr.Playstyle == playstyle){
               return arr;
            }
         }

         const dpsOne = searchParams.query.DPSOne
         const dpsTwo = searchParams.query.DPSTwo
         const dpsFilter = (arr:GroupType) => {
            if(dpsOne == "" && dpsTwo == "") {
               return arr;
            }
            else {
               return arr;
            }
         }

         const tankOne = searchParams.query.TankOne
         const tankTwo = searchParams.query.TankTwo
         const tankFilter = (arr:GroupType) => {
            if(tankOne == "" && tankTwo == "") {
               return arr;
            }
            else {
               return arr;
            }
         }

         const supportOne = searchParams.query.SupportOne
         const supportTwo = searchParams.query.SupportTwo
         const supportFilter = (arr:GroupType) => {
            if(supportOne == "" && supportTwo == "") {
               return arr;
            }
            else {
               return arr;
            }
         }

         //------------------------------------>  

      let startNum = 0;
         
      while(temporaryList.length < 200 && startNum % 5 == 0){
         const userQuery = query(userCollection, orderBy("Username"), limit(5), startAfter(startNum));

         const userList = await getDocs(userQuery);

        userList.forEach((doc) => {
         if(currentUser && doc.data()?.Id != currentUser.uid){
            const groups = doc.data()?.Groups;
 
            groups.forEach((groupInfo:GroupType) => {
               filterableArray.push(groupInfo);
               startNum++;
            })
         }
      })

      temporaryList = temporaryList.concat(filterableArray
         .filter(rankFilter)
         .filter(gamemodeFilter)
         .filter(microphoneFilter)
         .filter(regionFilter)
         .filter(playstyleFilter)
         .filter(dpsFilter)
         .filter(tankFilter)
         .filter(supportFilter)
      )
        //End of tempList Loop
      }
      setFinalList(temporaryList)
   }

   useEffect(() => {
      onAuthStateChanged(auth, (user) => {
         if (user && !currentUser) {
             setCurrentUser(user);
         }
       });
        setList()
  }, [currentUser])


    return (
        <div className={styles.top}>
            <Navbar />
               <GroupsList finalList={finalList}/>
            <Footer />
            <div className={styles.filler}></div>
        </div>
    )
}



//This will also mimic UserList, we just need to make it a copy

const GroupsList = (props:any) => {
   const [pageNum, setPageNum] = useState<number>(1);
   const perPage:number = 2;

   const changePage = (event:any) => {
       setPageNum(Number(event.target.id))
   }

   const handleJoin = async(selectable:string | undefined, userId:string | undefined, groupData:GroupType) => {
      if(selectable && userId && groupData){
         console.log("you can write to the document")
         const userData = doc(database, "fillAUser", userId);
         //Need to go through this person's groups and only change the one that is being show with the Groupdata.id


         /*
         First we make sure that we're able to click on this person and we passed all the props
         if that's clear we need to add this joinnee to the group, to do so we need to take all the
         original data from the group, keep and only alter the position the player is playing. So
         we just store that info in a temporary object and set the doc with merge so that all the informaiton will be
         uploaded. This will only count as one write
         */

         const groupInfo:GroupType = {
            Id: groupData.Id,
            Rank: groupData.Rank,
            Microphone: groupData.Microphone,
            Region: groupData.Region,
            Playstyle: groupData.Playstyle,
            Timestamp: groupData.Timestamp,
            Gamemode: groupData.Gamemode,
            DPSOne: groupData.DPSOne,
            DPSTwo: groupData.DPSTwo,
            TankOne: groupData.TankOne,
            TankTwo: groupData.TankTwo,
            SupportOne: groupData.SupportOne,
            SupportTwo: groupData.SupportTwo,
            UserId: groupData.UserId
        }

         try {
            await setDoc(userData, {
                Groups: arrayUnion(groupInfo)
            }, {merge: true})

            //navigate.push("/")
        } catch (error){}
      }
   }



   const currentUsers = usePaginateArray(pageNum, perPage, props.finalList)

   const mappedGroups = currentUsers.map((group:GroupType, index:number) =>
   <ul key={index} className={styles.groupStyle}>
       <div className={styles.subsectionSR}>
               <div className={styles.subsectionsrsub}>
                   <p> Gamemode: {group.Gamemode} </p>
               </div>
               <div className={styles.subsectionsrsub}>
                   <p> Playstyle: {group.Playstyle}</p>
               </div>
               <div className={styles.subsectionsrsub}>
                   <p> Rank: {group.Rank}</p>
               </div>
       </div>

       <div className={styles.subsectionSR}>
               <div className={styles.subsectionsrsub}>
                   <p> Region: {group.Region} </p>
               </div>
               <div className={styles.subsectionsrsub}>
                   <p> Microphone: {String(group.Microphone)}</p>
               </div>
       </div>
       <div className={styles.subsectionSR}>
               <div className={styles.subsectionsrsub}>
                   <p id={group.DPSOne == "" ? "role" : "filled"} onClick={() => handleJoin(group.DPSOne, group.UserId, group)}> DPS: {group.DPSOne}  </p>
                   <p id={group.DPSTwo == "" ? "role" : "filled"}  onClick={() => handleJoin(group.DPSTwo, group.UserId, group)}> DPS: {group.DPSTwo}  </p>
               </div>
               <div className={styles.subsectionsrsub}>
                   <p id={group.TankOne == "" ? "role" : "filled"}  onClick={() => handleJoin(group.TankOne, group.UserId, group)}> Tank: {group.TankOne} </p>
                   <p id={group.TankTwo == "" ? "role" : "filled"}  onClick={() => handleJoin(group.TankTwo, group.UserId, group)}> Tank: {group.TankTwo} </p>
               </div>
               <div className={styles.subsectionsrsub}>
                   <p id={group.SupportOne == "" ? "role" : "filled"} onClick={() => handleJoin(group.SupportOne, group.UserId, group)}> Support: {group.SupportOne}</p>
                   <p id={group.SupportTwo == "" ? "role" : "filled"}  onClick={() => handleJoin(group.SupportTwo, group.UserId, group)}> Support: {group.SupportTwo}</p>
               </div>
       </div>
   </ul>
)

   const pageNumbers = usePages(
      pageNum,
      props.finalList.length,
      perPage
   );

   const renderPageNums = pageNumbers.map((pageNum:number | string, index:number) => 
       <li
       key={index}
       id={String(pageNum)}
       className={styles.pagesList}
       >
           <button
           key={index}
           id={String(pageNum)}
           onClick={changePage}
           className={styles.pageButton}
           disabled={pageNum === "..." ? true : false}
           >
               {pageNum}
           </button>
       </li>
   )

   return (
       <div>
      <style>{`
      #role:hover {
         font-size: 16px;
         cursor: pointer;
       }
       #filled:hover {
         cursor: no-drop;
       }
      `}
      </style>
       <>
       <div className={styles.queryArea}>
            <li className={styles.mapStyle}>
               {mappedGroups}
            </li>
         </div>
    
     <div>
       <ul className={styles.pageNums}>
           {renderPageNums}
       </ul>
    </div> 

    </>
   </div>
   )
}

export default GroupResults