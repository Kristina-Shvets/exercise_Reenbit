export const isEqual = (chatName,searchVal)=>{
    for(let i=0;i<searchVal.length;i++){
        if(chatName[i] !== searchVal[i]){
            return false
        }
    }
    return true;
}