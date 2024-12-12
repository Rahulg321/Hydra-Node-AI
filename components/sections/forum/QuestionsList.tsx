import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "How do I solve quadratic equations?",
    content:
      "I'm struggling with quadratic equations. Can someone explain the steps to solve them?",
    author: "MathNewbie",
    avatar: "/avatars/user1.png",
    category: "Math",
    votes: 15,
    answers: 3,
    tags: ["algebra", "equations"],
  },
  {
    id: 2,
    title: "Tips for memorizing historical dates?",
    content:
      "I find it challenging to remember important dates for my history exam. Any effective techniques?",
    author: "HistoryBuff",
    avatar: "/avatars/user2.png",
    category: "History",
    votes: 8,
    answers: 2,
    tags: ["memorization", "study-tips"],
  },
  {
    id: 3,
    title: "Understanding photosynthesis process",
    content:
      "Can someone break down the steps of photosynthesis? I'm having trouble grasping the concept.",
    author: "BiologyStudent",
    avatar: "/avatars/user3.png",
    category: "Science",
    votes: 12,
    answers: 4,
    tags: ["biology", "plants"],
  },
];

export default function QuestionList() {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {question.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">{question.content}</p>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={question.avatar} alt={question.author} />
                <AvatarFallback>{question.author.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{question.author}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <ThumbsUp className="mr-1 h-4 w-4" />
                <span className="text-sm">{question.votes}</span>
              </div>
              <div className="flex items-center">
                <MessageCircle className="mr-1 h-4 w-4" />
                <span className="text-sm">{question.answers}</span>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
