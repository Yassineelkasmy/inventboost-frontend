import { createFileRoute } from '@tanstack/react-router'
import { AccountForm } from '../../components/forms/account-form'

export const Route = createFileRoute('/onboarding/')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="flex min-h-svh 2">
        {/* <div className=''>
            Steps
        </div> */}

        <div className="flex flex-col gap-4 p-6 md:p-10 w-3xl">
            <AccountForm />
        </div>

    </div>
}
