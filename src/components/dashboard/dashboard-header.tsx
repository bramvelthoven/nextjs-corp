// src/components/dashboard/dashboard-header.tsx
'use client'

import { User } from '@supabase/supabase-js'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogoutButton } from '@/components/logout-button'

interface DashboardHeaderProps {
    userData: User
    profileData: any
}

export default function DashboardHeader({ userData, profileData }: DashboardHeaderProps) {
    const userName = profileData?.basic_info?.name || userData.email?.split('@')[0] || 'there'

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-2xl">Welcome, {userName}!</CardTitle>
                    <CardDescription>
                        Your personal mental wellness dashboard
                    </CardDescription>
                </div>
                <LogoutButton />
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    <div className="bg-muted rounded-md px-3 py-1">
                        <span className="text-xs font-medium">Current Mood: </span>
                        <span className="text-sm">{getMoodLabel(profileData?.assessment?.currentMood || 3)}</span>
                    </div>

                    <div className="bg-muted rounded-md px-3 py-1">
                        <span className="text-xs font-medium">Sleep Quality: </span>
                        <span className="text-sm">{getQualityLabel(profileData?.assessment?.sleepQuality || 3)}</span>
                    </div>

                    <div className="bg-muted rounded-md px-3 py-1">
                        <span className="text-xs font-medium">Stress Level: </span>
                        <span className="text-sm">{getStressLabel(profileData?.assessment?.stressLevel || 3)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function getMoodLabel(level: number): string {
    const labels = ['Very Low', 'Low', 'Moderate', 'Good', 'Excellent']
    return labels[level - 1] || 'Moderate'
}

function getQualityLabel(level: number): string {
    const labels = ['Poor', 'Fair', 'Average', 'Good', 'Excellent']
    return labels[level - 1] || 'Average'
}

function getStressLabel(level: number): string {
    const labels = ['Minimal', 'Low', 'Moderate', 'High', 'Severe']
    return labels[level - 1] || 'Moderate'
}