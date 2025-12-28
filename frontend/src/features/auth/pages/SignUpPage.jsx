import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../../hooks/useAppContext'
import SignUpForm from '../components/SignUpForm'

const SignUpPage = () => {
  const { isAuthenticated, loading } = useAppContext()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Si ya está autenticado, redirigir al dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="pt-16">
      <SignUpForm />
    </main>
  )
}

export default SignUpPage