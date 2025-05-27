// src/components/onboarding/steps/basic-info.tsx
'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function BasicInfo({ data, updateData }) {
    const handleChange = (e) => {
        updateData('basicInfo', {
            ...data.basicInfo,
            [e.target.name]: e.target.value
        })
    }

    const handlePronounsChange = (value) => {
        updateData('basicInfo', {
            ...data.basicInfo,
            pronouns: value
        })
    }

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">What's your name?</Label>
                <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={data.basicInfo.name}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="Your age"
                    value={data.basicInfo.age}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Input
                    id="occupation"
                    name="occupation"
                    placeholder="Your occupation"
                    value={data.basicInfo.occupation}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="pronouns">Pronouns</Label>
                <Select
                    value={data.basicInfo.pronouns}
                    onValueChange={handlePronounsChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select your pronouns" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="he/him">He/Him</SelectItem>
                        <SelectItem value="she/her">She/Her</SelectItem>
                        <SelectItem value="they/them">They/Them</SelectItem>
                        <SelectItem value="other">Other/Prefer not to say</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}