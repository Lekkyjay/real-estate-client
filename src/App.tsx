import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'

function App() {  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />
    }
  ])


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
