import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout, RequireAuth } from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/single/Single'
import Profile from './pages/profile/Profile'
import ProfileUpdate from './pages/profileUpdate/ProfileUpdate'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import AddProperty from './pages/addProperty/AddProperty'

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
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },        
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/profile/update',
          element:<ProfileUpdate/>
        },
        {
          path: '/add',
          element: <AddProperty />
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
