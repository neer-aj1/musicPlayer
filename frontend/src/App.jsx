import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidenavbar from './components/Sidenavbar';

function App() {
  return (
    <div className='flex h-screen'>
      <Sidenavbar />
      <div className='flex-1 bg-red-600 h-screen overflow-y-auto'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  )
}

export default App
