'use server'

import { revalidatePath } from 'next/cache'
import db from '@/lib/db'
import { auth } from '@/auth'




export default  async function voteQuestion(questionId: string, voteValue: 1 | -1) {
    try {
        const session = await auth()
        if (!session || !session.user) {
            throw new Error('You must be logged in to vote')
        }

        const userId = session.user.id!

        const existingVote = await db.vote.findUnique({
            where: {
                userId_questionId: {
                    userId,
                    questionId,
                },
            },
        })

        if (existingVote) {
            if (existingVote.value === voteValue) {
                // User is trying to vote the same way again, so remove the vote
                await db.vote.delete({
                    where: { id: existingVote.id },
                })
            } else {
                // User is changing their vote
                await db.vote.update({
                    where: { id: existingVote.id },
                    data: { value: voteValue },
                })
            }
        } else {
            // New vote
            await db.vote.create({
                data: {
                    value: voteValue,
                    userId,
                    questionId,
                },
            })
        }

        // Get updated vote counts
        const upvotes = await db.vote.count({
            where: {
                questionId,
                value: 1,
            },
        })

        const downvotes = await db.vote.count({
            where: {
                questionId,
                value: -1,
            },
        })

        revalidatePath('/community/forum')
        revalidatePath(`/community/forum/${questionId}`)


        return { upvotes, downvotes }
    } catch (error) {
        console.error('Error voting:', error)
        throw new Error('Failed to vote. Please try again.')
    }
}


// export default  async function voteQuestion(questionId: string, voteValue: 1 | -1) {
//     try {
//         throw new Error('Not implemented')

//     } catch (error) {
//     console.error('Error voting:', error)
//     throw new Error('Failed to vote. Please try again.')
//   }
// }
