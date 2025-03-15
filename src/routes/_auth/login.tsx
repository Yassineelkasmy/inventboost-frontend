import { createFileRoute, useRouter } from '@tanstack/react-router'
import { LoginForm } from '../../components/forms/login-form'
import { useAuth } from '../../hooks/useAuth'

export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()
  const router = useRouter()
  if (user) {
    router.navigate({ to: "/onboarding" })
  }
  return <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
    <div className="w-full max-w-sm">
      <LoginForm />
    </div>
  </div>
}
