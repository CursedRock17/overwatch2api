import type { NextPage } from "next";
import { useState, useEffect } from "react";

import styles from "../../styles/Users.module.css"

import Navbar from "../../MainComponents/NavBar";
import Footer from "../../MainComponents/Footer";
import UsersList from "./UserList/index";

import { database } from "../../Firebase/FirebaseInit";
import { collection, query, limit, getDocs, startAfter, orderBy } from "firebase/firestore";  
import { useRouter } from "next/router";

import { UserDetails } from "../../Types/UserTypes";

const UserSearch:NextPage = () => {
    const [finalList, setFinalList] = useState<Array<any>>([]);
    
    let temporaryList:any = [];
    const filterableArray:any = []

    const searchParams = useRouter() 
    const userCollection = collection(database, "fillAUser");

   const setList = async() => {
                       //Setting Types
               //It's messy because you can't map these out
         //------------------------------------>
         const dpsmin = searchParams.query.DPSMin
         const dpsminFilter = (arr:UserDetails) => {
            if(!dpsmin){
               return arr;
            }
            else if(arr.DPS && arr.DPS >= Number(dpsmin)){
               return arr;
            }
         }

         const dpsmax = searchParams.query.DPSMax
         const dpsmaxFilter = (arr:UserDetails) => {
            if(!dpsmax){
               return arr;
            }
            else if(arr.DPS && arr.DPS <= Number(dpsmax)){
               return arr;
            }
         }

         const tankmin = searchParams.query.TankMin
         const tankminFilter = (arr:UserDetails) => {
            if(!tankmin){
               return arr;
            }
            else if(arr.Tank && arr.Tank >= Number(tankmin)){
               return arr;
            }
         }

         const tankmax = searchParams.query.TankMax
         const tankmaxFilter = (arr:UserDetails) => {
            if(!tankmax){
               return arr;
            }
            else if(arr.Tank && arr.Tank <= Number(tankmax)){
               return arr;
            }
         }

         const supportmin = searchParams.query.SupportMin
         const supportminFilter = (arr:UserDetails) => {
            if(!supportmin){
               return arr;
            }
            else if(arr.Support && arr.Support >= Number(supportmin)){
               return arr;
            }
         }

         const supportmax = searchParams.query.SupportMax
         const supportmaxFilter = (arr:UserDetails) => {
            if(!supportmax){
               return arr;
            }
            else if(arr.Support && arr.Support <= Number(supportmax)){
               return arr;
            }
         }

         const online = searchParams.query.Online
         const onlineFilter = (arr:UserDetails) => {
            if(online == null){
               return arr;
            }
            else if(arr.Online == Boolean(online)){
               return arr;
            }
         }

         const microphone = searchParams.query.Microphone
         const microphoneFilter = (arr:UserDetails) => {
            if(microphone == null){
               return arr;
            }
            else if(arr.Microphone == Boolean(microphone)){
               return arr;
            }
         }

         const region = searchParams.query.Region
         const regionFilter = (arr:UserDetails) => {
            if(!region) {
               return arr;
            }
            else if(arr.Region == region){
               return arr;
            }
         }

         const playstyle = searchParams.query.Playstyle
         const playstyleFilter = (arr:UserDetails) => {
            if(!playstyle) {
               return arr;
            }
            else if(arr.Playstyle == playstyle){
               return arr;
            }
         }

         const username = searchParams.query.Username
         const usernameFilter = (arr:UserDetails) => {
            if(!username) {
               return arr;
            }
            else if(arr.Username == username){
               return arr;
            }
         }
         //------------------------------------>  

         const recurList = async(name:string) => {
            //This will be the same funciton as in groups to quote that comment: 
         /*
         RecurList is a recursive function that will allow us to keep quries to a minimum as it will go
         through all the people and check their groups, from there we do queries in batches of 5 starting after
         the last Username we had found. It needs a default of the Bobthedog who must remain there in order to get it 
         to funciton, then we just add these things to the filter. It will limit the amount of queries we have to do
         */
         const userQuery = query(userCollection, orderBy("Username"), limit(5), startAfter(name));
         const userList = await getDocs(userQuery);
   
         let newName = name;

         if(userList.size == 0) return temporaryList

         userList.forEach((doc) => {
            filterableArray.push(doc.data());
            newName = doc.data().Username
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
         
         if(temporaryList.length < 200) recurList(newName)

         return temporaryList
         }
   
         const insertList = await recurList("Bobthedog")
         setFinalList(insertList)
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