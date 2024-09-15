import React from 'react'
import SideBar from './SideBar'

const Profile = () => {
  return (
    <div className='w-full'>
        <div className='w-[80%] mx-auto flex'>
            <div className='basis-1/5'>
                <SideBar />
            </div>
            <div className='basis-4/5'>
                <h1>Profile</h1>
            </div>
        </div>
    </div>
  )
}

export default Profile