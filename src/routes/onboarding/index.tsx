import { createFileRoute } from '@tanstack/react-router'
import { AccountForm } from '../../components/forms/account-form'
import { useUserProfile } from '../../api/userApi'
import { BenefitsDetailsForm } from '../../components/forms/benefits_details-form'
import { Progress } from '../../components/ui/progress'
import { useCallback } from 'react'

export const Route = createFileRoute('/onboarding/')({
    component: RouteComponent,
})

function RouteComponent() {
    const { data: userProfile, isLoading } = useUserProfile()

    const getCurrentOnBoardingStep = useCallback(() => {
        if (userProfile == undefined) return 1
        if (userProfile != undefined && userProfile.providerId == undefined) return 2
        if (userProfile != undefined && userProfile.providerId != undefined && userProfile.benefitCard == undefined) return 3

        return 0
    }, [useUserProfile])

    if (isLoading) return null

    return <div className="flex min-h-svh 2">
        <div className='flex flex-col p-8 bg-accent w-xs'>
            <div className='flex flex-col gap-2'>
                <h1 className="text-xl font-bold">Onboarding</h1>
                <h3 className='' >Step 1 of 4</h3>
                <Progress value={(getCurrentOnBoardingStep() / 4) * 100} />
            </div>
        </div>

        <div className="flex flex-col gap-4 p-6 md:p-10 w-3xl">
            {userProfile == undefined && < AccountForm />}
            {userProfile != undefined && userProfile.providerId == undefined && <BenefitsDetailsForm />}
        </div>

    </div>
}
