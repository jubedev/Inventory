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
import TiposEquipoListPage from './features/tipos-equipo/pages/TiposEquipoListPage'
import AccessRequestsListPage from './features/access-requests/pages/AccessRequestsListPage'

const router = createBrowserRouter ([
    {
        path: '/',
        element: <App />,
        errorElement: <Notfound />,
        children: [
            {
                index: true,
                element: <LandingPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'signup',
                element: <SignUpPage />
            },
        ],
    },
    {
        element: <DashboardLayout />,
        errorElement: <Notfound />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'equipos',
                element: <EquiposListPage />
            },
            {
                path: 'usuarios',
              
            {
                path: 'solicitudes',
                element: <AccessRequestsListPage />
            },  element: <div className="p-8"><h1 className="text-2xl">Usuarios (próximamente)</h1></div>
            },
            {
                path: 'tipos-equipo',
                element: <TiposEquipoListPage />
            },
            {
                path: 'movimientos',
                element: <div className="p-8"><h1 className="text-2xl">Movimientos (próximamente)</h1></div>
            },
            {
                path: 'reportes',
                element: <div className="p-8"><h1 className="text-2xl">Reportes (próximamente)</h1></div>
            },
        ],
    }
])

export default router