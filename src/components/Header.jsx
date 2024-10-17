import React from 'react'
import { Link } from 'react-router-dom'

function Header(){
  return (
    <nav className='w-4/5 flex md:justify-center justify-between items-center py-4 mx-auto text-white'>
      <div className='md:flex-[0.5] flex-initial justify-between items-center'>
        <Link to="/">
          <span className='px-2 py-1 font-bold text-3xl italic'>
            CreatConomy Dapp
          </span>
          <span className='py-1 font-semibold italic'>Creators Connect</span>
        </Link>
      </div>

      <ul className='md:flex-[0.5] hidden md:flex list-none justify-between item-center flex-initial'>
        <Link to="/" className="mx-4">
          Market
        </Link>
        <Link to="/collections">
        Collections
        </Link>
        <Link to="/" className="mx-4">
        Artist
        </Link>
        <Link to="/" className="mx-4">
        Community
        </Link>
      </ul>

      <button className='shadow-xl shadow-black bg-green-500
      hover:bg-green-700 md:text-sm sm:text-base p-2 rounded-full'>
        Connect Wallet
      </button>
    </nav>
  )
}

export default Header