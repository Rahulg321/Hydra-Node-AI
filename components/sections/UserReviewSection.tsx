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
      <div className="container mb-14 text-center">
        <h2>
          User{" "}
          <span className="via-[#AF89EE]/80.89% bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Reviews
          </span>
        </h2>
        <p>
          Here are some reviews from our happy users from all around the world.
          We <br /> are looking forward to you become the newest member of the
          community.
        </p>
      </div>
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
    <div className="rounded-xl bg-base p-4">
      <p className="mb-12 font-semibold text-white">
        We envisions a future where education and professional development are
        democratized, accessible, and rewarding for all. We aim to empower a
        global community of learners and professionals.
      </p>

      <div className="mb-2 flex gap-4 text-xl text-yellow-400">
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
      </div>
      <div className="flex justify-between">
        <div className="text-white">
          <h4>Rahul Gupta</h4>
          <span>Product Designer</span>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
