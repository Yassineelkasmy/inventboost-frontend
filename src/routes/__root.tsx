import { createRootRouteWithContext, Outlet, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { useAuth } from "../hooks/useAuth";
import { useUserProfile } from "../api/userApi";


export interface RouterContext {
    isSignedIn: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({



    component: () => {
        const { user: authUser, loading } = useAuth()
        const { data: userProfile } = useUserProfile()
        const router = useRouter()

        if (!authUser) {
            router.navigate({ to: '/login' })
        } else {
            router.navigate({ to: '/onboarding' })
        }

        if (loading) {
            return <div>
                Loading
            </div>
        }
        return (
            <>
                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }
})