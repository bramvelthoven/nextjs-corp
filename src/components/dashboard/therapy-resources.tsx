'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { UserProfile } from '@/types/profile'
import { BookOpen, Video, Headphones, ExternalLink } from 'lucide-react'

interface TherapyResourcesProps {
    profileData: UserProfile | null;
}

interface Resource {
    title: string;
    type: string;
    description: string;
    url: string;
    icon: React.ElementType;
}

export default function TherapyResources({ profileData }: TherapyResourcesProps) {
    // Get therapy style from profile
    const therapyStyle = profileData?.therapy_preferences?.style || 'general';

    const getResources = (): Resource[] => {
        // Resources could be filtered based on user preferences
        return [
            {
                title: "Understanding CBT Techniques",
                type: "Article",
                description: "Learn the basics of Cognitive Behavioral Therapy",
                url: "/resources/cbt-basics",
                icon: BookOpen
            },
            {
                title: "Guided Meditation Session",
                type: "Audio",
                description: "A 10-minute guided meditation for anxiety relief",
                url: "/resources/meditation-anxiety",
                icon: Headphones
            },
            {
                title: "Therapy Session: Stress Management",
                type: "Video",
                description: "Watch a therapist explain stress management techniques",
                url: "/resources/stress-management",
                icon: Video
            }
        ];
    };

    const resources = getResources();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Therapy Resources</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {resources.map((resource, index) => (
                        <div key={index} className="flex flex-col gap-2 p-3 rounded-lg border">
                            <div className="flex items-center gap-2">
                                <div className="bg-primary/10 p-2 rounded-full">
                                    <resource.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{resource.title}</h4>
                                    <p className="text-xs text-muted-foreground">{resource.type}</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{resource.description}</p>
                            <Button variant="outline" size="sm" className="w-full mt-2" asChild>
                                <a href={resource.url} className="flex items-center gap-2">
                                    <span>View Resource</span>
                                    <ExternalLink className="h-3 w-3" />
                                </a>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}