import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Error from './components/Error.jsx';
import Signup from './routes/Signup.jsx';
import Signin from './routes/Signin.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { Home } from './routes/Home.jsx';
import AlbumSongs from './routes/AlbumSongs.jsx';
import SongStrip from './components/SongStrip.jsx';
import Search from './routes/Search.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sign-up",
        element: <Signup />
      },
      {
        path: "sign-in",
        element: <Signin />
      },
      {
        path: "album/:albumid",
        element: <AlbumSongs />
      },
      {
        path: "/search",
        element: <Search />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
)
