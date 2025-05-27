// src/app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import MoodTracker from '@/components/dashboard/mood-tracker'
import RecommendedActivities from '@/components/dashboard/recommended-activities'
import TherapyResources from '@/components/dashboard/therapy-resources'
import UpcomingAppointments from '@/components/dashboard/upcoming-appointments'
import { Card, CardContent } from '@/components/ui/card'

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

    if (!profileData?.onboarding_completed) {
        redirect('/protected')
    }

    return (
        <div className="container mx-auto space-y-6">
            <DashboardHeader userData={userData.user} profileData={profileData} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <MoodTracker initialMood={profileData?.assessment?.currentMood || 3} userId={userData.user.id} />
                    <RecommendedActivities profileData={profileData} />
                </div>

                <div className="space-y-6">
                    <UpcomingAppointments userId={userData.user.id} />
                    <TherapyResources preferences={profileData?.therapy_preferences} />
                </div>
            </div>
        </div>
    )
}