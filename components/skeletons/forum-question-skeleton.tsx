import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ArrowBigUp, ArrowBigDown, MessageSquare } from 'lucide-react'

export function ForumQuestionSkeleton() {
    return (
        <div className="border-l-4 border-primary p-4 rounded-lg shadow-lg">
            <div className="flex items-center mb-2">
                <Skeleton className="w-8 h-8 rounded-full mr-2" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32 ml-2" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-4" />
            <div className="flex flex-wrap mb-2">
                <Skeleton className="h-6 w-16 rounded mr-2 mb-2" />
                <Skeleton className="h-6 w-20 rounded mr-2 mb-2" />
                <Skeleton className="h-6 w-24 rounded mr-2 mb-2" />
            </div>
            <div className="flex items-center">
                <Button variant="outline" size="icon" disabled>
                    <ArrowBigUp className="h-4 w-4" />
                </Button>
                <Skeleton className="h-4 w-8 mx-2" />
                <Button variant="outline" size="icon" disabled>
                    <ArrowBigDown className="h-4 w-4" />
                </Button>
                <Skeleton className="h-4 w-8 mx-2" />
                <Button variant="outline" size="sm" className="ml-4" disabled>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <Skeleton className="h-4 w-8" />
                </Button>
            </div>
        </div>
    )
}
