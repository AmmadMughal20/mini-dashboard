
import React from 'react'
import { Provider } from 'react-redux'
import { useSelector } from 'react-redux'
import { store, type RootState } from './store'
import AuthScreen from './pages/AuthScreen'
import Dashboard from './pages/Dashboard'

/**
 * App router component handling authentication flow
 * Conditionally renders auth screen or dashboard based on auth state
 */
const AppRouter: React.FC = () =>
{
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  return isAuthenticated ? <Dashboard /> : <AuthScreen />
}

/**
 * Root App component with providers and global configuration
 */
const App: React.FC = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

export default App
