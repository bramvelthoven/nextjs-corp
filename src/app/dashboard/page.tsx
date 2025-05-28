import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import MoodTracker from '@/components/dashboard/mood-tracker'
import RecommendedActivities from '@/components/dashboard/recommended-activities'
import TherapyResources from '@/components/dashboard/therapy-resources'
import UpcomingAppointments from '@/components/dashboard/upcoming-appointments'
import { UserProfile } from '@/types/profile'

export default async function DashboardPage() {
    const supabase = await createClient()

    // Check if user is logged in
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError || !userData?.user) {
        redirect('/auth/login')
    }

    // Get user profile data
    const { data: profileData } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userData.user.id)
        .single()

    // Type assertion to help TypeScript understand the structure
    const typedProfileData = profileData as UserProfile | null

    if (!typedProfileData || typedProfileData.onboarding_completed !== true) {
        redirect('/protected')
    }

    return (
        <div className="container mx-auto space-y-6">
            <DashboardHeader userData={userData.user} profileData={typedProfileData} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <MoodTracker
                        initialMood={typedProfileData.assessment?.currentMood || 3}
                        userId={userData.user.id}
                    />
                    <RecommendedActivities/>
                </div>

                <div className="space-y-6">
                    <UpcomingAppointments userId={userData.user.id} />
                    <TherapyResources/>
                </div>
            </div>
        </div>
    )
}