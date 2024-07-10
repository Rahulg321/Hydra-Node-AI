import React from "react";
import { FaStar } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserReviewSection = () => {
  return (
    <section className="block-space">
      <h2>User Reviews</h2>
      <span>
        Here are some reviews from our happy users from all around the world. We
        are looking forward to you become the newest member of the community.
      </span>
      <div className="flex gap-6">
        <UserReviewCard />
        <UserReviewCard />
        <UserReviewCard />
        <UserReviewCard />
      </div>
    </section>
  );
};

export default UserReviewSection;

function UserReviewCard() {
  return (
    <Card className="bg-base">
      <CardHeader></CardHeader>
      <CardContent className="space-y-4">
        <span>
          We envisions a future where education and professional development are
          democratized, accessible, and rewarding for all. We aim to empower a
          global community of learners and professionals.
        </span>

        <div className="flex gap-4 text-yellow-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>
        <div className="flex justify-between">
          <div>
            <h4>Rahul Gupta</h4>
            <span>Product Designer</span>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}
