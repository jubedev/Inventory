import { Outlet, Navigate } from 'react-router-dom'
import { useAppContext } from '../hooks/useAppContext'
import Aside from '../components/shared/Aside'
import Header from '../components/shared/Header'

const DashboardLayout = () => {
  const { isAuthenticated, loading } = useAppContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen pt-16">
        <Aside />
        <div className="flex-1 bg-gray-50 ml-64">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
