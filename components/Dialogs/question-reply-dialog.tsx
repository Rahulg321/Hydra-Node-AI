"use client"

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, KeyboardEvent, FormEvent, useTransition } from "react"
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from "rehype-sanitize"
import { resolve } from 'path'
import AddForumQuestion from '@/actions/add-forum-questions'
import { useToast } from '@/hooks/use-toast'
import addReply from '@/actions/reply-question'

export default function QuestionReplyDialog({ questionId }: { questionId: string }) {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState("good question!!!!")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}

        if (content.length === 0) {
            newErrors.content = "Content should not be empty"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            startTransition(async () => {
                try {
                    const response = await addReply(questionId, content)
                    setContent("")
                    toast({
                        title: "Reply Submitted",
                        description: "Your reply has been submitted successfully",
                    })
                    setIsOpen(false)
                } catch (error: any) {
                    console.error("Failed to add reply:", error)
                    toast({
                        title: "Failed to add reply",
                        description: `Could not add reply: ${error.message || "Server error"}`,
                        variant: "destructive"
                    })
                }

            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Reply<X className="h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Send a Reply</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="question">Your reply</Label>
                        <MDEditor
                            value={content}
                            onChange={(value) => setContent(value || "")}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                        />
                        {errors.content && <p className="text-sm text-red-500">{errors.question}</p>}
                    </div>

                    <Button type="submit" className="w-auto" disabled={isPending}>
                        {
                            isPending ? "Submitting..." : "Submit Question"
                        }
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
