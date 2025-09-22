"use client";

import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';



const ProfilePage = () => {
const router=useRouter();
const [data,setData]=React.useState('nothing');
  const logout=async()=>{
   try {
    await axios.get("/api/users/logout")
    toast.success("logout successfully");
    router.push("/login")

   } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
      toast.error(error.message);
    }
   }
  }
const getUserDetails=async()=>{
   const res=await  axios.get('/api/users/me');
   console.log(res.data);
   setData(res.data.data._id);

}


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2 className='p-3 rounded bg-green-500'>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
        
        <hr />
        <button onClick={logout} 
         className='bg-blue-500 mt-4 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>logOut</button>
          <button onClick={getUserDetails}
         className='bg-blue-500 mt-4 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded'>GetUser details</button>
    </div>
  )
}

export default ProfilePage