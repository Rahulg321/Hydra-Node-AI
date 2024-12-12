import { redirect } from "next/navigation";
import React from "react";

const InstrcutorPage = () => {
  redirect("/instructor/exams");
  return <div>InstrcutorPage</div>;
};

export default InstrcutorPage;
