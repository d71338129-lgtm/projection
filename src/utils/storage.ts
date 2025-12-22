const TOKEN_KEY='interview_token'

export const setStorageToken=(token:string):void=>{
  localStorage.setItem(TOKEN_KEY,token)
}

export const getStorageToken=():string|null=>{
  return localStorage.getItem(TOKEN_KEY)
}
export const removeStorageToken=():void=>{
  localStorage.removeItem(TOKEN_KEY)
}
