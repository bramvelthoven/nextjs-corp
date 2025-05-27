// src/components/onboarding/steps/therapy-preferences.tsx
'use client'

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TherapyPreferencesProps {
    data: {
        preferences: {
            therapyStyle: string;
            communicationFrequency: string;
            preferredApproach: string[];
        }
    };
    updateData: (field: string, value: any) => void;
}

export default function TherapyPreferences({ data, updateData }: TherapyPreferencesProps) {
    const handleTherapyStyleChange = (value: string) => {
        updateData('preferences', {
            ...data.preferences,
            therapyStyle: value
        })
    }

    const handleFrequencyChange = (value: string) => {
        updateData('preferences', {
            ...data.preferences,
            communicationFrequency: value
        })
    }

    const handleApproachChange = (approach: string, checked: boolean) => {
        const updatedApproaches = checked
            ? [...data.preferences.preferredApproach, approach]
            : data.preferences.preferredApproach.filter(a => a !== approach)

        updateData('preferences', {
            ...data.preferences,
            preferredApproach: updatedApproaches
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <Label>What therapy style do you prefer?</Label>
                <RadioGroup
                    value={data.preferences.therapyStyle}
                    onValueChange={handleTherapyStyleChange}
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="directive" id="directive" />
                        <Label htmlFor="directive">Directive (more guidance)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="non-directive" id="non-directive" />
                        <Label htmlFor="non-directive">Non-directive (more listening)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="balanced" id="balanced" />
                        <Label htmlFor="balanced">Balanced approach</Label>
                    </div>
                </RadioGroup>
            </div>

            <div className="space-y-3">
                <Label>How often would you like to communicate?</Label>
                <Select
                    value={data.preferences.communicationFrequency}
                    onValueChange={handleFrequencyChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-3">
                <Label>Which therapeutic approaches interest you?</Label>
                <div className="space-y-2">
                    {[
                        { id: 'cbt', label: 'Cognitive Behavioral Therapy (CBT)' },
                        { id: 'mindfulness', label: 'Mindfulness' },
                        { id: 'psychodynamic', label: 'Psychodynamic' },
                        { id: 'solution-focused', label: 'Solution-focused' },
                        { id: 'acceptance', label: 'Acceptance and Commitment Therapy' }
                    ].map((approach) => (
                        <div key={approach.id} className="flex items-center space-x-2">
                            <Checkbox
                                id={approach.id}
                                checked={data.preferences.preferredApproach.includes(approach.id)}
                                onCheckedChange={(checked) =>
                                    handleApproachChange(approach.id, checked === true)
                                }
                            />
                            <Label htmlFor={approach.id}>{approach.label}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}