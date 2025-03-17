import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './index.css'
import { ThemeProvider } from './components/ui/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/sonner'
import StoreProvider from './store-provider'
import { useAuth } from './hooks/useAuth'


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function AuthenticatedRouterProvider() {
  const { user, loading } = useAuth()
  if (loading) return null
  return <RouterProvider router={router} context={{ isSignedIn: Boolean(user) }} />
}



const router = createRouter({ routeTree, context: { isSignedIn: false } })

export const queryClient = new QueryClient()

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <StoreProvider>
            <AuthenticatedRouterProvider />
            <Toaster />
          </StoreProvider>
        </QueryClientProvider>
      </ThemeProvider>

    </StrictMode>,
  )
}