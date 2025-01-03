'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

interface ReplyFormProps {
    questionId: string
    onReplyAdded: () => void
}

export default function ReplyForm({ questionId, onReplyAdded }: ReplyFormProps) {
    const [content, setContent] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { data: session } = useSession()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!session) {
            toast({
                title: "Authentication required",
                description: "You must be logged in to reply.",
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        try {
            await addReply(questionId, content)
            setContent('')
            onReplyAdded()
            toast({
                title: "Reply added",
                description: "Your reply has been successfully added.",
            })
        } catch (error) {
            console.error('Error adding reply:', error)
            toast({
                title: "Error",
                description: "Failed to add reply. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your reply..."
                className="mb-2"
                required
            />
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Reply'}
            </Button>
        </form>
    )
}
