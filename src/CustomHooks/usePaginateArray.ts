function usePaginateArray(pageNum:number, perPage:number, listToPaginate:Array<any>){
    const indexOfLastDoc = pageNum * perPage;
    const indexOfFirstDoc = indexOfLastDoc - perPage;
    const currentUsers = listToPaginate.slice(indexOfFirstDoc, indexOfLastDoc);

    return currentUsers
}

export default usePaginateArray