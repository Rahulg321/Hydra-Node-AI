import NewVerificationForm from "@/components/forms/NewVerificationForm";
import React from "react";

const NewVerificationPage = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <section className="block-space container">
      <NewVerificationForm />
    </section>
  );
};

export default NewVerificationPage;
