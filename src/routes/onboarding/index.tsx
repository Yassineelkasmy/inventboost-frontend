import { createFileRoute, useRouter, useSearch } from '@tanstack/react-router'
import { AccountForm } from '../../components/forms/account-form'
import { useUserProfile } from '../../api/userApi'
import { BenefitsDetailsForm } from '../../components/forms/benefits_details-form'
import { Progress } from '../../components/ui/progress'
import { useCallback, useMemo } from 'react'
import { Button } from '../../components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import { useAuth } from '../../hooks/useAuth'
import { z } from 'zod'
import { UploadDocumentForm } from '../../components/forms/uplpad-document-form'
import { VerificationForm } from '../../components/forms/verification-form'

const onboardingParams = z.object({
    onboardingEmail: z.string().email().optional(),
})

type OnboardingParamsSchema = z.infer<typeof onboardingParams>

export const Route = createFileRoute('/onboarding/')({
    component: RouteComponent,
    validateSearch: onboardingParams,
})

function RouteComponent() {
    const { data: userProfile, isLoading } = useUserProfile()
    const { user } = useAuth()
    const router = useRouter()

    const { onboardingEmail } = Route.useSearch()

    const currentOnBoardingStep = useMemo(() => {
        if (!userProfile || !userProfile.firstName || !userProfile.lastName) return 1
        if (!userProfile.providerId) return 2
        if (!userProfile.benefitCard) return 3
        if (userProfile.benefitCard) return 4
        return 1
    }, [userProfile])


    const onLogoutClick = useCallback(() => {
        signOut(auth).then(() => router.navigate({ to: '/login' }))
    }, [])

    if (isLoading) return null


    return (
        <div className="flex flex-col md:flex-row min-h-svh">
            <div className="flex flex-col p-4 sm:p-6 md:p-8 bg-accent w-full md:w-64">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg sm:text-xl font-bold">Onboarding</h1>
                    <h3>Step {currentOnBoardingStep} of 4</h3>
                    <Progress value={(currentOnBoardingStep / 4) * 100} />
                </div>

                {Boolean(user) && <Button className="mt-4 md:mt-auto px-4 py-2" onClick={onLogoutClick}>
                    <LogOut />     Logout
                </Button>}
            </div>

            <div className="flex flex-col gap-4 p-4 sm:p-6 md:p-10 w-full max-w-3xl mx-auto">
                {currentOnBoardingStep === 1 && <AccountForm onboardingEmail={onboardingEmail} />}
                {currentOnBoardingStep === 2 && <BenefitsDetailsForm />}
                {currentOnBoardingStep === 3 && <UploadDocumentForm />}
                {currentOnBoardingStep === 4 && <VerificationForm />}
            </div>
        </div>
    )
}
