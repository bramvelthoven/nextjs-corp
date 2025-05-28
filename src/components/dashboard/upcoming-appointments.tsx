// src/components/dashboard/upcoming-appointments.tsx
'use client'

import {useEffect, useRef, useState} from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CalendarPlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Appointment {
    id: string;
    title: string;
    date: string;
    time: string;
    therapist: string;
}

export default function UpcomingAppointments({ userId }: { userId: string }) {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // This would fetch real appointments in a production app
                // For now, we'll use sample data
                setAppointments([
                    {
                        id: '1',
                        title: 'Therapy Session',
                        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                        time: '3:00 PM',
                        therapist: 'Dr. Sarah Johnson'
                    }
                ])
            } catch (error) {
                console.error('Error fetching appointments:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAppointments()
    }, [userId, supabase])

    return (
        <Card className="appointments-fade">
            <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <p className="text-center text-muted-foreground">Loading appointments...</p>
                ) : appointments.length > 0 ? (
                    <ul className="space-y-4">
                        {appointments.map(appointment => (
                            <li key={appointment.id} className="border rounded-md p-3">
                                <div className="font-medium">{appointment.title}</div>
                                <div className="text-sm text-muted-foreground">
                                    {appointment.date} at {appointment.time}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    with {appointment.therapist}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-6">
                        <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                        <Button className="gap-2">
                            <CalendarPlus className="h-4 w-4" />
                            Schedule Session
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}