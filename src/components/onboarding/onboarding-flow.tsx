// src/components/onboarding/onboarding-flow.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import BasicInfo from './steps/basic-info'
import MentalHealthGoals from './steps/mental-health-goals'
import MoodAssessment from './steps/mood-assessment'
import TherapyPreferences from './steps/therapy-preferences'
import PrivacyConsent from './steps/privacy-consent'
import OnboardingComplete from './steps/onboarding-complete'

export default function OnboardingFlow({ userId }: { userId: string }) {
    const [step, setStep] = useState(0)
    const [onboardingData, setOnboardingData] = useState({
        basicInfo: {
            name: '',
            age: '',
            occupation: '',
            pronouns: '',
        },
        goals: [] as string[],
        assessment: {
            currentMood: 3,
            sleepQuality: 3,
            stressLevel: 3,
            recentChallenges: '',
        },
        preferences: {
            therapyStyle: '',
            communicationFrequency: 'weekly',
            preferredApproach: [],
        },
        privacyConsent: false,
    })
    const router = useRouter()
    const supabase = createClient()

    const steps = [
        { title: 'Tell us about yourself', component: BasicInfo },
        { title: 'Your mental health goals', component: MentalHealthGoals },
        { title: 'How are you feeling?', component: MoodAssessment },
        { title: 'Therapy preferences', component: TherapyPreferences },
        { title: 'Privacy & consent', component: PrivacyConsent },
        { title: 'All set!', component: OnboardingComplete },
    ]

    const CurrentStep = steps[step].component

    const updateData = (field: string, value: any) => {
        setOnboardingData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    const nextStep = async () => {
        if (step === steps.length - 2) {
            // Save all data before showing completion step
            await saveOnboardingData()
        }

        if (step < steps.length - 1) {
            setStep(step + 1)
        } else {
            router.push('/dashboard')
        }
    }

    const prevStep = () => {
        if (step > 0) setStep(step - 1)
    }

    const saveOnboardingData = async () => {
        try {
            await supabase.from('user_profiles').upsert({
                user_id: userId,
                basic_info: onboardingData.basicInfo,
                goals: onboardingData.goals,
                assessment: onboardingData.assessment,
                therapy_preferences: onboardingData.preferences,
                onboarding_completed: true,
                created_at: new Date().toISOString(),
            })
        } catch (error) {
            console.error('Error saving onboarding data:', error)
        }
    }

    return (
        <Card className="w-full max-w-lg mx-auto">
            <CardHeader>
                <CardTitle className="text-xl text-center">{steps[step].title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CurrentStep
                    data={onboardingData}
                    updateData={updateData}
                />
            </CardContent>
            <CardFooter className="flex justify-between">
                {step > 0 && step < steps.length - 1 && (
                    <Button variant="outline" onClick={prevStep}>
                        Back
                    </Button>
                )}
                <div className="flex-1"></div>
                <Button onClick={nextStep}>
                    {step === steps.length - 1 ? 'Go to Dashboard' : 'Continue'}
                </Button>
            </CardFooter>
        </Card>
    )
}