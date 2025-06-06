import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './components/getuser/User'
import Add from './components/adduser/Add'
import Edit from './components/updateuser/Edit'

const App = () => {
  const route = createBrowserRouter([
    {
      path:"/",
      element:<User/>,
    },
    {
      path:"/add",
      element:<Add/>,
    },
    {
      path:"/edit/:id",
      element:<Edit/>,
    },
  ])
  return (
    <>
    <div className='App'>

    <RouterProvider router={route}></RouterProvider>

    </div>
    </>
    
  )
}

export default App