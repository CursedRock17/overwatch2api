import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { useState, useEffect } from 'react';

import styles from "../../../styles/GroupPage.module.css"

import Navbar from "../../../MainComponents/NavBar";
import Footer from '../../../MainComponents/Footer';
import { GroupType } from '../../../Types/UserTypes';

import { collection, query, limit, orderBy, getDocs, startAfter } from 'firebase/firestore';
import { database } from '../../../Firebase/FirebaseInit';


const GroupResults:NextPage = () => {

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

         //------------------------------------>  

      let startNum = 0;
         
      while(temporaryList.length < 200 && startNum % 500 == 0){
         const userQuery = query(userCollection, orderBy("Username"), limit(500), startAfter(startNum));

         const userList = await getDocs(userQuery);

        userList.forEach((doc) => {
           filterableArray.push(doc.data());
           startNum++;
        })
  
      temporaryList = temporaryList.concat(filterableArray
         .filter(rankFilter)
         .filter(gamemodeFilter)
         .filter(microphoneFilter)
         .filter(regionFilter)
         .filter(playstyleFilter)
      )
        //End of tempList Loop

      }

      setFinalList(temporaryList)
   }

    useEffect(() => {
        setList();
    }, [])



    return (
        <div className={styles.top}>
            <Navbar />
            Pass FinalList as a prop
            <Footer />
            <div className={styles.filler}></div>
        </div>
    )
}

export default GroupResults