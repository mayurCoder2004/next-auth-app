import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { requestToBodyStream } from "next/dist/server/body-streams";
export const getDataFromToken=(request:NextRequest)=>{
    try {
      const token=  request.cookies.get("token")?.value || '';
      const decodedToken:any=jwt.verify(token,process.env.TOKEN_SECRET!);
      return decodedToken.id;
    } catch (error:any) {
        throw new Error(error.message);
        
    }


}