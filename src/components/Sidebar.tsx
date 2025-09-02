import React from 'react'
import { FaHome,FaUserAlt, FaCog, FaSignOutAlt, FaBars } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

const Sidebar = () => {
const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className='flex'>
      <div className={`bg-gray-800 transition-width duration-300 text-white ${isOpen ? "w-64" : "w-20"} md:w-64`}>
        <div className='flex justify-between items-center p-4'>
          <h2 className={`text-xl font-bold md:block ${isOpen ? "block" : "hidden"}`}>MyApp</h2>
          <button className='block md:hidden' onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <IoCloseSharp size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <nav className='mt-4'>
          <ul>
            <li className='flex items-center p-4 hover:bg-gray-700 cursor-pinter'>
              <FaHome size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Home</span>
            </li>
            <li className='flex items-center p-4 hover:bg-gray-700 cursor-pinter'>
              <FaUserAlt size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Profile</span>
            </li>
            <li className='flex items-center p-4 hover:bg-gray-700 cursor-pinter'>
              <FaCog size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Settings</span>
            </li>
            <li className='flex items-center p-4 hover:bg-gray-700 cursor-pinter'>
              <FaSignOutAlt size={24} />
              <span className={`ml-4 md:block ${isOpen ? "block" : "hidden"}`}>Logout</span>
            </li>
          </ul>
        </nav>
      </div>
     
    </div>
  )
}

export default Sidebar
