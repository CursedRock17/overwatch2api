import { useState, useEffect } from "react";
import styles from "./Users.module.css"

import Navbar from "../../MainComponents/NavBar";
import Footer from "../../MainComponents/Footer";
import UsersList from "./UsersListComponent";

import { database } from "../../Firebase/FirebaseInit";
import { collection, query, limit, getDocs, startAfter, orderBy } from "firebase/firestore";  
import { useRouter } from "next/router";

import { QueryType } from "../../Types/UserTypes";

const UserSearch = () => {

    const [finalList, setFinalList] = useState([]);
    let temporaryList:any = [];
    const filterableArray:any = []

    const searchParams = useRouter() 
    const userCollection = collection(database, "fillAUser");

   const setList = async() => {
                       //Setting Types
               //It's messy because you can't map these out
         //------------------------------------>
         const dpsmin = searchParams.query.DPSMin
         const dpsminFilter = (arr:QueryType) => {
            if(!dpsmin){
               return arr;
            }
            else if(arr.DPSMin == Number(dpsmin)){
               return arr;
            }
         }

         const dpsmax = searchParams.query.DPSMax
         const dpsmaxFilter = (arr:QueryType) => {
            if(!dpsmax){
               return arr;
            }
            else if(arr.DPSMax == Number(dpsmax)){
               return arr;
            }
         }

         const tankmin = searchParams.query.TankMin
         const tankminFilter = (arr:QueryType) => {
            if(!tankmin){
               return arr;
            }
            else if(arr.TankMin && arr.TankMin > Number(tankmin)){
               return arr;
            }
         }

         const tankmax = searchParams.query.TankMax
         const tankmaxFilter = (arr:QueryType) => {
            if(!tankmax){
               return arr;
            }
            else if(arr.TankMax && arr.TankMax < Number(tankmax)){
               return arr;
            }
         }

         const supportmin = searchParams.query.SupportMin
         const supportminFilter = (arr:QueryType) => {
            if(!supportmin){
               return arr;
            }
            else if(arr.SupportMin && arr.SupportMin > Number(tankmax)){
               return arr;
            }
         }

         const supportmax = searchParams.query.SupportMax
         const supportmaxFilter = (arr:QueryType) => {
            if(!supportmax){
               return arr;
            }
            else if(arr.SupportMax && arr.SupportMax < Number(tankmax)){
               return arr;
            }
         }

         const online = searchParams.query.Online
         const onlineFilter = (arr:QueryType) => {
            if(online == null){
               return arr;
            }
            else if(arr.Online == Boolean(online)){
               return arr;
            }
         }

         const microphone = searchParams.query.Microphone
         const microphoneFilter = (arr:QueryType) => {
            if(microphone == null){
               return arr;
            }
            else if(arr.Microphone == Boolean(microphone)){
               return arr;
            }
         }

         const region = searchParams.query.Region
         const regionFilter = (arr:QueryType) => {
            if(!region) {
               return arr;
            }
            else if(arr.Region == region){
               return arr;
            }
         }

         const playstyle = searchParams.query.Playstyle
         const playstyleFilter = (arr:QueryType) => {
            if(!playstyle) {
               return arr;
            }
            else if(arr.Playstyle == playstyle){
               return arr;
            }
         }

         const username = searchParams.query.Username
         const usernameFilter = (arr:QueryType) => {
            if(!username) {
               return arr;
            }
            else if(arr.Username == username){
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
         .filter(dpsminFilter)
         .filter(dpsmaxFilter)
         .filter(tankminFilter)
         .filter(tankmaxFilter)
         .filter(supportminFilter)
         .filter(supportmaxFilter)
         .filter(onlineFilter)
         .filter(microphoneFilter)
         .filter(regionFilter)
         .filter(playstyleFilter)
         .filter(usernameFilter)
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
         <UsersList finalList={finalList}/>
      <Footer />
    </div>
 );
}


export default UserSearch;