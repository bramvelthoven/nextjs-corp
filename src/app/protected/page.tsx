// src/app/protected/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import OnboardingFlow from '@/components/onboarding/onboarding-flow'
import { LogoutButton } from '@/components/logout-button'

export default async function ProtectedPage() {
    const supabase = await createClient()

    // Check if user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/auth/login')
    }

    // Check if user has completed onboarding
    const { data: profileData } = await supabase
        .from('user_profiles')
        .select('onboarding_completed')
        .eq('user_id', userData.user.id)
        .single()

    const onboardingCompleted = profileData?.onboarding_completed

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {!onboardingCompleted ? (
                <OnboardingFlow userId={userData.user.id} />
            ) : (
                <div className="flex h-svh w-full items-center justify-center gap-2">
                    <p>
                        Hello <span>{userData.user.email}</span>
                    </p>
                    <LogoutButton />
                </div>
            )}
        </div>
    )
}