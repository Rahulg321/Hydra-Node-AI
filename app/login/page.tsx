import LoginForm from "@/components/forms/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <section className="block-space-large">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div></div>
        <div className="container">
          <h3>Login TO Hydranode</h3>
          <LoginForm />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
