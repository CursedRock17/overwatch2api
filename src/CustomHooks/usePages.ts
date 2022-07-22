export const DOTS = "...";
import { useState, useEffect } from "react";

const usePages = (currentPage:number , totalCount:number , pageSize:number ) => {

  const [pagination, setPagination] = useState<Array<number | string>>([]);

  /*
    When creating the hook I wanted to make sure that
    every scenario could be accounted for, for smaller page numbers and sets,
    it was important to create special forms of the hooks. For example,
    there shouldn't be dots on both sides when the user is on page 2, same for
    the second to last page. There doesn't seem to be a similar pattern between any
    of the else if statements that would allow for easier statement writing. Also,
    a series of else if statements was the easiest and smoothest design structure to follow
    I made us of the useEffect hook because it was the best way to track changes and only
    cause a rerender if something truely needed to change, which makes the app run
  */

    
  useEffect(() => {

    const firstPage = 1;
    const lastPage = Math.ceil(totalCount / pageSize);
    const pageDifference = lastPage - firstPage

    if(firstPage == lastPage){
      setPagination([1]);
    }
    
    else if(pageDifference < 4){
      for(let i = 2; i <= pageDifference + 1; i++){
        if(pagination.length == 1){
          setPagination(oldArray => [
            ...oldArray,
            i
          ])
        }
      }
    }

    else if(pageDifference == 5){
      setPagination([ 1, 2, 3, 4, 5])
    }

    else if(currentPage == 1){
      setPagination([ firstPage, currentPage + 1, currentPage + 2, DOTS, lastPage])
    }
    else if(currentPage == 2){
      setPagination([ firstPage, currentPage, currentPage + 1, DOTS, lastPage])
    }

    else if(currentPage == lastPage - 1){
      setPagination([ firstPage, DOTS, currentPage - 1, currentPage, lastPage])
    }

    else if(currentPage == lastPage){
      setPagination([ firstPage, DOTS, currentPage - 2, currentPage - 1, lastPage])
    }

    else {
      setPagination([ firstPage, DOTS, currentPage - 1, currentPage, currentPage + 1, DOTS, lastPage])
    }
  }, [currentPage, totalCount])

  return pagination;
}

export default usePages;