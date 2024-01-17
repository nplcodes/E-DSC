'use client'


import { IoIosSettings } from "react-icons/io";

const NavBar = () => {

  return (
      <nav className='bg-blue-500 text-white p-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <h2 className='text-lg font-semibold'>User Panel</h2>
        </div>
        <div className=''>
          <IoIosSettings className="text-2xl cursor-pointer"/>
          
        </div>
      </nav>
  );
};

export default NavBar;
