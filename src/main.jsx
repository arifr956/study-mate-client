import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/HomePage/Home.jsx';
import Root from './pages/Root/Root.jsx';
import ErrorPage from './pages/Root/ErrorPage.jsx';
import AuthProvider from './providers/AuthProvder/AuthProvider';
import Login from './users/Login';
import Registration from './users/Registration';
import User from './users/User';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        //loader: () => fetch ('/.json')

      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration/>
      },
      {
        path: '/profile',
        element: <PrivateRoute><User></User></PrivateRoute>
      },

    ]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
