'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserProfile } from '@/types/profile'
import { Dumbbell, BookOpen, MusicIcon, LucideIcon } from 'lucide-react'
import { useRef } from "react";
import { useGsapFadeUpStagger } from "@/components/hooks/useGsapFadeUpStagger";
interface RecommendedActivitiesProps {
    profileData: UserProfile | null;
}

interface Activity {
    title: string;
    description: string;
    icon: LucideIcon;
}

export default function RecommendedActivities({ profileData }: RecommendedActivitiesProps) {
    // Generate activities based on profile data
    const getRecommendedActivities = (): Activity[] => {
        const activities: Activity[] = [
            {
                title: "5-minute meditation",
                description: "Take a short break to clear your mind and reduce stress",
                icon: BookOpen
            },
            {
                title: "Quick workout routine",
                description: "A short exercise session to boost your energy and mood",
                icon: Dumbbell
            },
            {
                title: "Relaxation playlist",
                description: "Listen to calming music to improve your mental state",
                icon: MusicIcon
            }
        ]

        return activities;
    }

    const activities = getRecommendedActivities();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recommended Activities</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <activity.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">{activity.title}</h4>
                                <p className="text-sm text-muted-foreground">{activity.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}