"use client";
import React from 'react'
import User from './user'
import OrderInformationCard from './orderInformationCard';
const page = () => {


  return (
    <div className='flex flex-col md:flex-row gap-12 py-10 px-4 '>
      <User/>
<OrderInformationCard/>

    </div>
   
  )
}

export default page
