'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Message {
    id: string
    content: string
    user_id: string
    created_at: string
}

export default function ChatRoom({ params }: { params: { roomId: string } }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const supabase = createClient()

    useEffect(() => {
        // Subscribe to new messages
        const channel = supabase
            .channel(`room:${params.roomId}`)
            .on('postgres_changes', {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `room_id=eq.${params.roomId}`,
                },
                payload => {
                    setMessages(current => [...current, payload.new as Message])
                })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [params.roomId])

    const sendMessage = async () => {
        if (!newMessage.trim()) return

        await supabase
            .from('messages')
            .insert([
                {
                    content: newMessage,
                    room_id: params.roomId
                }
            ])

        setNewMessage('')
    }

    return (
        <Card className="p-4 h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                    <div key={message.id} className="p-2 rounded bg-muted">
                        {message.content}
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-4">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </Card>
    )
}