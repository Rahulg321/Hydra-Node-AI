import { auth } from "@/auth";
import RoleGate from "@/components/RoleGate";
import React from "react";

const AdminPage = async () => {
  const session = await auth();

  return (
    <section className="block-space container">
      <h1>Admin Page</h1>
      <RoleGate role={session?.user.role}>Hello World</RoleGate>
    </section>
  );
};

export default AdminPage;
