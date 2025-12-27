import { createBrowserRouter } from 'react-router-dom'

// Layouts
import App from './App'
import DashboardLayout from './layouts/DashboardLayout'

//Error Views
import Notfound from './features/error/Notfound'

// Public Views
import LoginPage from './features/auth/pages/LoginPage'
import SignUpPage from './features/auth/pages/SignUpPage'
import LandingPage from './features/landing/pages/LandingPage'

// Private Views
import DashboardPage from './features/dashboard/pages/DashboardPage'
import EquiposListPage from './features/equipos/pages/EquiposListPage'

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
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            },
        ],
        errorElement: <Notfound />,
    },
    {
        path: '/',
        element: <DashboardLayout />,
        children: [
            {
                path: '/dashboard',
                element: <DashboardPage />
            },
            {
                path: '/equipos',
                element: <EquiposListPage />
            },
        ],
        errorElement: <Notfound />,
    }
])

export default router