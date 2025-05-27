'use client'
import { useEffect, useState } from 'react'
import ChatRoom from '@/components/chatroom'
import { Card, CardContent } from '@/components/ui/card'

export default function ChatPage() {
  const [rooms, setRooms] = useState<ChatRoom[]>([])

  useEffect(() => {
    const fetchRooms = async () => {
      const { data } = await supabase
          .from('chat_rooms')
          .select('*')
          .order('created_at', { ascending: false })
      if (data) setRooms(data)
    }
    fetchRooms()
  }, [])

  return (
      <Card>
        <CardContent>
          {rooms.map((room) => (
              <ChatRoom key={room.id} roomId={room.id} />
          ))}
        </CardContent>
      </Card>
  )
}