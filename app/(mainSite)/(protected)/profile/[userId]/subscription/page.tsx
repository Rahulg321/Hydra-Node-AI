import React, { Suspense } from "react";
import CurrentPlanSection from "../CurrentPlanSection";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserById } from "@/prisma/queries";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const PersonSubscriptionPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const userSession = await auth();

  if (!userSession) {
    redirect("/login");
  }

  if (userSession.user.id !== userId) {
    redirect(`/profile/${userId}/subscription`);
  }

  const existingLoggedInUser = await getUserById(userId);

  if (!existingLoggedInUser) {
    return redirect("/login");
  }

  return (
    <section className="container py-10">
      <Suspense fallback={<Skeleton className="h-[200px] w-full rounded-xl" />}>
        <CurrentPlanSection existingUser={existingLoggedInUser} />
      </Suspense>
    </section>
  );
};

export default PersonSubscriptionPage;
