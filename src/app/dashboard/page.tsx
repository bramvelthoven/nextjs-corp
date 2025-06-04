import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardHeader from '@/components/dashboard/dashboard-header'
import MoodTracker from '@/components/dashboard/mood-tracker'
import RecommendedActivities from '@/components/dashboard/recommended-activities'
import TherapyResources from '@/components/dashboard/therapy-resources'
import UpcomingAppointments from '@/components/dashboard/upcoming-appointments'
import { UserProfile } from '@/types/profile'
import { checkSubscription } from '@/lib/subscription'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

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

    // Check subscription status
    const { hasAccess, subscription, plan } = await checkSubscription(userData.user.id)

    // If no active subscription for paid features, show upgrade prompt
    if (!hasAccess && plan !== 'free') {
        return (
            <div className="container mx-auto space-y-6 pt-8">
                <Card className="border-destructive">
                    <CardHeader>
                        <CardTitle className="text-destructive">Subscription Required</CardTitle>
                        <CardDescription>
                            Your subscription is {subscription}. Please update your payment method or choose a new plan to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                            <Button asChild>
                                <Link href="/pricing">View Plans</Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/account">Manage Subscription</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto space-y-6 pt-8">
            <DashboardHeader userData={userData.user} profileData={typedProfileData} />
            
            {/* Show plan info */}
            {plan && plan !== 'free' && (
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-semibold text-primary">Current Plan: {plan.charAt(0).toUpperCase() + plan.slice(1)}</p>
                                <p className="text-sm text-muted-foreground">Status: {subscription}</p>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/account">Manage</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

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