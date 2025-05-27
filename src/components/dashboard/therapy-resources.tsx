// src/components/dashboard/mood-tracker.tsx
'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClient } from '@/lib/supabase/client'

export default function MoodTracker({ initialMood, userId }: { initialMood: number; userId: string }) {
    const [mood, setMood] = useState(initialMood)
    const [note, setNote] = useState('')
    const [saving, setSaving] = useState(false)
    const supabase = createClient()

    const saveMoodEntry = async () => {
        setSaving(true)
        try {
            await supabase
                .from('mood_entries')
                .insert({
                    user_id: userId,
                    mood_level: mood,
                    notes: note || null,
                    created_at: new Date().toISOString()
                })
            setNote('')
        } catch (error) {
            console.error('Error saving mood:', error)
        } finally {
            setSaving(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>How are you feeling today?</CardTitle>
                <CardDescription>Track your mood to monitor your mental wellness</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>😔 Not well</span>
                        <span>😊 Great</span>
                    </div>
                    <Slider
                        value={[mood]}
                        min={1}
                        max={5}
                        step={1}
                        onValueChange={(value) => setMood(value[0])}
                    />
                </div>

                <Textarea
                    placeholder="Add notes about how you're feeling (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={3}
                />
            </CardContent>
            <CardFooter>
                <Button onClick={saveMoodEntry} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Entry'}
                </Button>
            </CardFooter>
        </Card>
    )
}