import request from "@/utils/request";
interface RegisterData{
  username:string
  password:string
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
