"use client";
import React from 'react'
import Header from './header'
import HeaderSignIn from '@/components/headerSignIn'
import { useSession } from "next-auth/react";
import Message from '@/components/message';

const HeaderLayout = () => {
  
         const { data: session } = useSession();
       
  return (
 
    <div>
      <div>{session?<Header/>:<HeaderSignIn/>}</div>
<Message />
    </div>
  )
}

export default HeaderLayout
