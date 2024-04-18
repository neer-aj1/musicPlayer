import { Link, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidenavbar from './components/Sidenavbar';
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { signOutUser } from './redux/slices/userSlice';
import { useDispatch } from 'react-redux';
import AudioPlayer from './components/AudioPlayer';


function App() {
  const client_access_token = Cookies.get('client_access_token')
  const dispatch = useDispatch();
  useEffect(() => {
    if(!client_access_token)
      dispatch(signOutUser());
  }, [])
  return (
    <div className='flex h-screen'>
      <Sidenavbar />
      <div className='flex-1 bg-gray-950 h-screen overflow-y-auto overflow-x-hidden'>
        <Navbar />
        <Outlet />
        <AudioPlayer/>
      </div>
    </div>
  )
}

export default App
