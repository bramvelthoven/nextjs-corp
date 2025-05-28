// src/components/onboarding/steps/onboarding-complete.tsx
'use client'

import { CheckCircle } from 'lucide-react'

interface OnboardingCompleteProps {
    data: any;
    updateData: (field: string, value: any) => void;
}

export default function OnboardingComplete({ data }: OnboardingCompleteProps) {
    return (
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-300" />
            </div>

            <h3 className="text-xl font-semibold text-center">You're all set!</h3>

            <p className="text-center text-muted-foreground max-w-md">
                Thank you for completing your profile, {data.basicInfo.name}. We're excited to begin this journey with you.
            </p>

            <div className="text-center text-muted-foreground">
                <p>You can now access all the features of our mental health app.</p>
                <p className="mt-2">Click "Go to Dashboard" to continue.</p>
            </div>
        </div>
    )
}