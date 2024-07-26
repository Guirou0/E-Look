import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import Home from '../routes/Home.jsx'
import Pesos from '../routes/Pesos.jsx'
import Corte from '../routes/Corte.jsx'
import Curso from '../routes/Curso.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/corte",
        element: <Corte />
      },
      {
        path: "/pesos",
        element: <Pesos />
      },
      {
        path: "/curso",
        element: <Curso />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
