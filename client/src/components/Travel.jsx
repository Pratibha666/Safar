import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Travel = () => {
  const { user, handleLogout } = useAuth()
  
  return (
    <div className='w-full min-h-screen bg-black p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-12'>
        <div>
          <h1 className='text-5xl font-bold text-lime-400 mb-2'>
            TRAVEL
          </h1>
          <p className='text-zinc-400'>
            Welcome, <span className='text-lime-300 font-semibold'>{user?.username}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className='px-6 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-black text-[17px] font-bold duration-200 cursor-pointer'
        >
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className='bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8'>
        <h2 className='text-2xl font-bold text-white mb-4'>Your Travel Diaries</h2>
        <p className='text-zinc-400'>
          Start creating your travel memories here
        </p>
      </div>
    </div>
  )
}

export default Travel