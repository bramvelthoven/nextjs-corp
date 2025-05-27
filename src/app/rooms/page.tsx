'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Room {
    id: string
    name: string
    created_at: string
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([])
    const supabase = createClient()

    useEffect(() => {
        const fetchRooms = async () => {
            const { data } = await supabase
                .from('rooms')
                .select('*')
                .order('created_at', { ascending: false })
            if (data) setRooms(data)
        }
        fetchRooms()
    }, [])

    const createRoom = async () => {
        const { data } = await supabase
            .from('rooms')
            .insert([{ name: `Room ${rooms.length + 1}` }])
            .select()
            .single()

        if (data) setRooms(prev => [data, ...prev])
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Chat Rooms</CardTitle>
                    <Button onClick={createRoom}>New Room</Button>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {rooms.map((room) => (
                            <Link key={room.id} href={`/chat/${room.id}`}>
                                <Card className="p-4 hover:bg-muted cursor-pointer">
                                    <h3 className="font-medium">{room.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(room.created_at).toLocaleDateString()}
                                    </p>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}