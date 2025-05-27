import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Message {
    id: string;
    content: string;
    user_id: string;
    room_id: string;
    created_at: string;
}

export default function ChatRoom({ roomId }: { roomId: string }) {
    const [messages, setMessages] = useState<Message[]>([])
    const supabase = createClient();

    useEffect(() => {
        // First fetch existing messages
        const fetchMessages = async () => {
            const { data } = await supabase
                .from('messages')
                .select('*')
                .eq('room_id', roomId)
                .order('created_at', { ascending: true });

            if (data) setMessages(data);
        };

        fetchMessages();

        // Then subscribe to new messages
        const channel = supabase
            .channel(`room:${roomId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `room_id=eq.${roomId}`
                },
                (payload) => {
                    const newMessage = payload.new as Message;
                    setMessages(prev => [...prev, newMessage]);
                }
            )
            .subscribe();

        return () => {
            channel.unsubscribe();
        };
    }, [roomId, supabase]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Chat Room</CardTitle>
            </CardHeader>
            <CardContent>
                {messages.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">No messages yet</p>
                ) : (
                    <div className="space-y-2">
                        {messages.map((message) => (
                            <div key={message.id} className="p-2 rounded bg-muted">
                                {message.content}
                                <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(message.created_at).toLocaleTimeString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}