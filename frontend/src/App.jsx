import { Link, Outlet } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Navbar from './components/Navbar';

function App() {
  return (
    <div className='flex bg-green-500 h-screen'>
      <div className='flex flex-2 min-w-96 flex-col gap-1 max-h-screen bg-blue-500'>
        <div className='bg-slate-500'>
          <nav>
            <div className='flex gap-1 items-center'>
              <IoHomeOutline />
              <Link to='/'>Home</Link>
            </div>
            <div className='flex gap-1 items-center'>
              <IoIosSearch />
              <Link to='/search'>Search</Link>
            </div>
          </nav>
        </div>
        <div className='bg-slate-500 overflow-y-auto'>
          <h2>Your Favourite Songs</h2>
        </div>
      </div>
      <div className='flex-1 bg-red-600 overflow-y-auto'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
