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
import UsuariosListPage from './features/usuarios/pages/UsuariosListPage'
import UsuariosSistemaListPage from './features/usuarios-sistema/pages/UsuariosSistemaListPage'
import MovimientosListPage from './features/movimientos_inventario/pages/MovimientosListPage'

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
                path: 'tipos-equipo',
                element: <TiposEquipoListPage />
            },
            {
                path: 'usuarios',
                element: <UsuariosListPage />            
            },
            {
                path: 'usuarios-sistema',
                element: <UsuariosSistemaListPage />
            },
            {
                path: 'solicitudes',
                element: <AccessRequestsListPage />
            },
            {
                path: 'actas',
                element: <div className="p-8"><h1 className="text-2xl">Actas (próximamente)</h1></div>
            },
            {
                path: 'movimientos',
                element: <MovimientosListPage />
            },
            {
                path: 'reportes',
                element: <div className="p-8"><h1 className="text-2xl">Reportes (próximamente)</h1></div>
            },
        ],
    }
])

export default router