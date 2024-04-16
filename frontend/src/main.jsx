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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Error />
      },
      {
        path: "sign-up",
        element: <Signup />
      },
      {
        path: "sign-in",
        element: <Signin />
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
