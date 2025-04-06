import React from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Rootlayout from './Rootlayout';
import UserProfile from './userProfile';
import ReminderForm from './Remainders';

function App() {
  let BrowserRouter=createBrowserRouter([
    {
      path:'',
      element:<Rootlayout/>,
      children:[
        {
          path:'',
          element:<UserProfile/>
        },
        {
          path:'/remainder',
          element:<ReminderForm/>
      }
      ]
    }
  ])
  return (
   <div>
    <RouterProvider router={BrowserRouter}></RouterProvider>
   </div>
  );
}

export default App;
