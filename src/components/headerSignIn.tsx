import React from 'react'
import Link from 'next/link'
import NexusHub from './icons/nexusHub'

const HeaderSignIn = () => {
  return (
    <div className='flex justify-between w-full px-10 pt-8 pb-10 border-b border-gray-200 mb-8'>
        <div className="flex-shrink-0">
              <NexusHub/>
              </div>
              <Link href='/login' className='w-[121] h-[54] bg-primary-500 text-base flex items-center justify-center border rounded'>Sign In</Link>
    </div>
  )
}

export default HeaderSignIn
