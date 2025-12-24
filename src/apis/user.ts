import request from "@/utils/request";
import type { ServiceResponse } from "./article";
interface RegisterData{
  username:string
  password:string
}
export interface UserProfile{
  id:string
  username:string
  name:string|null
  avatar:string
  createdAt:string
  updatedAt:string
}
interface ServiceLoginResponse{
  code:number
  message:string
  data:LoginResponse
}
interface LoginResponse{
  token:string
  currentAuthority:string
  status:string
  type:string
}
export const LoginAPI=(data:RegisterData):Promise<ServiceLoginResponse>=>{
  return request.post('/h5/user/login',data)
}
export const registerAPI=(data:RegisterData)=>{
  return request.post('/h5/user/register',data)
}
export const getUserProfileAPI=():Promise<ServiceResponse<UserProfile>>=>{
  return request.get('/h5/user/currentUser')
}
export const logoutAPI=()=>{
  return request.get('/h5/user/logout')
}