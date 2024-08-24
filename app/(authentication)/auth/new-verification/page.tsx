import NewVerificationForm from "@/components/forms/NewVerificationForm";
import React, { Suspense } from "react";

const NewVerificationPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <section className="block-space container">
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </section>
  );
};

export default NewVerificationPage;
