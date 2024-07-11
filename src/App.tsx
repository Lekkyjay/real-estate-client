import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/single/Single'
import Profile from './pages/profile/Profile'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'

function App() {  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />      
        },
        {
          path: '/list',
          element: <List />      
        },
        {
          path: '/:id',
          element: <Single />      
        },
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/profile/update',
          element:<ProfileUpdate/>
        }
      ]
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
