import { createBrowserRouter, RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { routes } from './routes/index.tsx'

const router = createBrowserRouter(routes)

const root = document.getElementById('root')

const container = createRoot(root!)

container.render(<RouterProvider router={router} />)
