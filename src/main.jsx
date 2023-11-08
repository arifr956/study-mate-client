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
import CreateAssignment from './pages/Assignment/CreateAssignment';
import AllAssignment from './pages/Assignment/AllAssignment';
import MyAssignment from './pages/Assignment/MyAssignment';
import SubmittedAssignment from './pages/Assignment/SubmittedAssignment';
import UpdateAssignment from './pages/Assignment/UpdateAssignment';
import ViewAssignment from './pages/Assignment/ViewAssignment';
import AssignmentSubmission from './pages/Assignment/AssignmentSubmission';

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
      {
        path: '/allassignment',
        element: <AllAssignment/>
      },
      {
        path: '/createassignment',
        element: <PrivateRoute><CreateAssignment></CreateAssignment></PrivateRoute>
      },
      {
        path: '/myassignment',
        element: <PrivateRoute><MyAssignment/></PrivateRoute>
      },
      {
        path: '/submittedassignment',
        element: <PrivateRoute><SubmittedAssignment/></PrivateRoute>
      },
      {
        path: 'updateassignment/:id',
        element: <PrivateRoute><UpdateAssignment/></PrivateRoute>,
        loader: ({params}) => fetch(`https://study-mate-server-qmpse44ck-arifur-rahmans-projects.vercel.app/allAssignment/${params.id}`)
      },
      {
        path: 'viewassignment/:id',
        element: <PrivateRoute><ViewAssignment/></PrivateRoute>,
        loader: ({params}) => fetch(`https://study-mate-server-qmpse44ck-arifur-rahmans-projects.vercel.app/allAssignment/${params.id}`)
      },
      {
        path: 'submitAssignment/:id',
        element: <PrivateRoute><AssignmentSubmission/></PrivateRoute>,
        loader: ({params}) => fetch(`https://study-mate-server-qmpse44ck-arifur-rahmans-projects.vercel.app/allAssignment/${params.id}`)
      },
     

    ]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </React.StrictMode>,
)
