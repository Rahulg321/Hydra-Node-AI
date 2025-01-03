import { ForumQuestionSkeleton } from "@/components/skeletons/forum-question-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function loading() {
    return (
        <section className="block-space big-container">
            <div className="mb-8">
                <Skeleton className="h-10 w-1/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-10 w-40" />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[...Array(6)].map((_, index) => (
                    <ForumQuestionSkeleton key={index} />
                ))}
            </div>
        </section>
    )
}
