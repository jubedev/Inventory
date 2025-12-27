import { createBrowserRouter } from 'react-router-dom'

// Outlet
import App from './App'

//Error Views
import Notfound from './features/error/Notfound'

//Views
import LoginPage from './features/auth/pages/LoginPage'
import SignUpPage from './features/auth/pages/SignUpPage'
import LandingPage from './features/landing/pages/LandingPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'

const router = createBrowserRouter ([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            },
        ],
        errorElement: <Notfound />,
    }
])

export default router