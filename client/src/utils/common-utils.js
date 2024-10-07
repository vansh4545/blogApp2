


export const getAccessToken = ()=>{
    return sessionStorage.getItem('accesstoken');

}

export const addElipsis = (str,limit)=>{
    return str.length > limit ? str.substr(0,limit)+'...':str;
}

export const getType = (value,body)=>{
    if(value.params){
         return {params:body};
    }
    else if(value.query){
        
    }
}