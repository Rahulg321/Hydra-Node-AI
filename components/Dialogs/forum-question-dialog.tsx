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

export default function ForumQuestionDialog() {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [tagInput, setTagInput] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [question, setQuestion] = useState("Ask a question?")
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()

    const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            const newTag = tagInput.trim()
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag])
                setTagInput("")
            }
        }
    }

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove))
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}


        if (title.length === 0) {
            newErrors.title = "Title is required"
        } else if (title.length > 100) {
            newErrors.title = "Title is too long"
        }

        if (tags.length === 0) {
            newErrors.tags = "Tags are required, please add at least one tag"
        } else if (tags.length > 5) {
            newErrors.tags = "You can only add upto 5 tags"

        }

        if (question.length === 0) {
            newErrors.question = "Question is required"
        }


        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            startTransition(async () => {
                const formData = new FormData()
                formData.append('title', title)
                formData.append('question', question)
                formData.append('tags', tags.join(','))
                const response = await AddForumQuestion(formData)
                if (response.type === "success") {
                    setTitle("")
                    setQuestion("")
                    setTags([])
                    toast({
                        title: "Question Submitted",
                        description: "Your question has been submitted successfully",
                    })
                    setIsOpen(false)
                }

                if (response.type === "error") {
                    toast({
                        title: "Failed to submit question",
                        description: response.message,
                        variant: "destructive"
                    })
                }
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Ask a Question<X className="h-4 w-4" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">New Question</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter a Title"
                        />
                        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags</Label>
                        <div className="p-2 cursor-pointer rounded-md flex flex-wrap gap-2 items-center border">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-sm border"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                            <Input
                                id="tags"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInput}
                                placeholder={tags.length === 0 ? "Enter tags separated by comma" : "Add more tags..."}
                                className="border-0 bg-transparent p-0 text-sm focus-visible:ring-0 flex-1 min-w-[200px]"
                            />
                        </div>
                        {errors.tags && <p className="text-sm text-red-500">{errors.tags}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="question">Question</Label>
                        <MDEditor
                            value={question}
                            onChange={(value) => setQuestion(value || "")}
                            previewOptions={{
                                rehypePlugins: [[rehypeSanitize]],
                            }}
                        />
                        {errors.question && <p className="text-sm text-red-500">{errors.question}</p>}
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
