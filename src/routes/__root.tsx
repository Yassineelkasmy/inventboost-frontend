import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export interface RouterContext {
    isSignedIn: boolean
}

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        return (
            <>
                <Outlet />
                <TanStackRouterDevtools />
            </>
        )
    }
})