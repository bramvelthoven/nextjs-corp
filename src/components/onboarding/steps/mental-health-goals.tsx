'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface MentalHealthGoalsProps {
    data: {
        goals: string[];
        [key: string]: any;
    };
    updateData: (step: string, data: any) => void;
}

export default function MentalHealthGoals({ data, updateData }: MentalHealthGoalsProps) {
    const [otherGoal, setOtherGoal] = useState('')

    const goals = [
        { id: 'reduce-anxiety', label: 'Reduce anxiety' },
        { id: 'manage-depression', label: 'Manage depression' },
        { id: 'improve-sleep', label: 'Improve sleep quality' },
        { id: 'reduce-stress', label: 'Reduce stress' },
        { id: 'develop-coping', label: 'Develop coping mechanisms' },
        { id: 'better-relationships', label: 'Build better relationships' },
        { id: 'self-care', label: 'Practice self-care' },
        { id: 'work-life-balance', label: 'Improve work-life balance' }
    ]

    const handleGoalChange = (goalId: string, checked: boolean) => {
        const updatedGoals = checked
            ? [...data.goals, goalId]
            : data.goals.filter(g => g !== goalId)

        updateData('goals', updatedGoals)
    }

    const addCustomGoal = () => {
        if (otherGoal && !data.goals.includes(otherGoal)) {
            updateData('goals', [...data.goals, otherGoal])
            setOtherGoal('')
        }
    }

    return (
        <div className="space-y-4">
            <p className="text-muted-foreground">
                Select all that apply to your mental health journey.
            </p>

            <div className="space-y-3">
                {goals.map((goal) => (
                    <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                            id={goal.id}
                            checked={data.goals.includes(goal.id)}
                            onCheckedChange={(checked) => handleGoalChange(goal.id, checked === true)}
                        />
                        <Label htmlFor={goal.id}>{goal.label}</Label>
                    </div>
                ))}
            </div>

            <div className="flex items-end space-x-2 pt-2">
                <div className="flex-1">
                    <Label htmlFor="other-goal">Other goal</Label>
                    <Textarea
                        id="other-goal"
                        placeholder="Enter another goal..."
                        value={otherGoal}
                        onChange={(e) => setOtherGoal(e.target.value)}
                        className="resize-none"
                    />
                </div>
                <Button
                    variant="outline"
                    onClick={addCustomGoal}
                    disabled={!otherGoal}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}