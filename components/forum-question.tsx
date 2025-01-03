'use client'

import { useState, useTransition, useOptimistic } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import voteQuestion from '@/actions/vote'
import ReplyForm from './reply-form'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { formatDistanceToNow } from 'date-fns'

interface Reply {
    id: string
    content: string
    author: {
        name: string
        avatarUrl: string
    }
    createdAt: Date
}

interface ForumQuestionProps {
    id: string
    author: {
        name: string
        avatarUrl: string
    }
    timestamp: Date
    title: string
    content: string
    tags: string[]
    metrics: {
        upvotes: number
        downvotes: number
        replies: number
    }
    classname?: string
}

export default function ForumQuestion({
    id,
    author,
    timestamp,
    title,
    content,
    tags,
    metrics,
    classname,
}: ForumQuestionProps) {
    const [optimisticMetrics, addOptimisticMetric] = useOptimistic(
        metrics,
        (state, newVote: 1 | -1) => ({
            ...state,
            upvotes: newVote === 1 ? state.upvotes + 1 : state.upvotes,
            downvotes: newVote === -1 ? state.downvotes + 1 : state.downvotes,
        })
    )

    const [isPending, startTransition] = useTransition()
    const { data: session } = useSession()
    const router = useRouter()
    const [showReplies, setShowReplies] = useState(false)

    const handleVote = async (voteValue: 1 | -1) => {
        if (!session) {
            toast({
                title: "Authentication required",
                description: "You must be logged in to vote.",
                variant: "destructive",
            })
            return
        }

        startTransition(async () => {
            try {
                addOptimisticMetric(voteValue)
                await voteQuestion(id, voteValue)
                toast({
                    title: "Vote recorded",
                    description: "Your vote has been successfully recorded.",
                })
            } catch (error) {
                console.error('Error voting:', error)
                toast({
                    title: "Error",
                    description: "Failed to record your vote. Please try again.",
                    variant: "destructive",
                })
            }
        })
    }


    return (
        <div className={cn(`border-l-4 border-primary p-4 dark:bg-muted rounded-lg shadow-lg`, classname)}>
            <div className="flex items-center mb-2">
                <img src={author.avatarUrl} alt={author.name} className="w-8 h-8 rounded-full mr-2" />
                <span className="font-semibold">{author.name}</span>
                <span className="text-gray-500 ml-2">
                    {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                </span>
            </div>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="mb-4">{content}</p>
            <div className="flex flex-wrap mb-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded mr-2 mb-2">
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex items-center">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleVote(1)}
                    disabled={isPending}
                >
                    <ArrowBigUp className="h-4 w-4" />
                </Button>
                <span className="mx-2">{optimisticMetrics.upvotes}</span>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleVote(-1)}
                    disabled={isPending}
                >
                    <ArrowBigDown className="h-4 w-4" />
                </Button>
                <span className="mx-2">{optimisticMetrics.downvotes}</span>
                <Button
                    variant="outline"
                    size="sm"
                    className="ml-4"
                >

                    <MessageSquare className="h-4 w-4 mr-2" />
                    {
                        metrics.replies
                    }
                </Button>
            </div>

        </div>
    )
}
