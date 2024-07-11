import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/home/Home'
import List from './pages/list/List'
import Single from './pages/single/Single'
import Profile from './pages/profile/Profile'

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
