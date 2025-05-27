'use client'

import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

interface MoodAssessmentProps {
    data: {
        assessment: {
            currentMood: number;
            sleepQuality: number;
            stressLevel: number;
            recentChallenges: string;
        }
    };
    updateData: (field: string, value: any) => void;
}

export default function MoodAssessment({ data, updateData }: MoodAssessmentProps) {
    const handleSliderChange = (field: string, value: number[]) => {
        updateData('assessment', {
            ...data.assessment,
            [field]: value[0]
        })
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateData('assessment', {
            ...data.assessment,
            recentChallenges: e.target.value
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label>How would you rate your current mood? (1-5)</Label>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Very low</span>
                    <span>Very high</span>
                </div>
                <Slider
                    value={[data.assessment.currentMood]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleSliderChange('currentMood', value)}
                />
            </div>

            <div className="space-y-3">
                <Label>How has your sleep quality been lately? (1-5)</Label>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Poor</span>
                    <span>Excellent</span>
                </div>
                <Slider
                    value={[data.assessment.sleepQuality]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleSliderChange('sleepQuality', value)}
                />
            </div>

            <div className="space-y-3">
                <Label>What's your current stress level? (1-5)</Label>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                    <span>Low stress</span>
                    <span>High stress</span>
                </div>
                <Slider
                    value={[data.assessment.stressLevel]}
                    min={1}
                    max={5}
                    step={1}
                    onValueChange={(value) => handleSliderChange('stressLevel', value)}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="challenges">Any recent challenges you'd like to share?</Label>
                <Textarea
                    id="challenges"
                    placeholder="Tell us about any recent challenges..."
                    value={data.assessment.recentChallenges}
                    onChange={handleTextChange}
                    rows={4}
                />
            </div>
        </div>
    )
}