import React from "react";
import Login from "./(pages)/(auth)/_components/Login";
import ApplicationLogo from "@/components/ui/ApplicationLogo";

const Homepage = () => {
  return (
    <section className="mx-auto flex min-h-screen w-[90%] max-w-lg flex-col justify-center">
      <div className="flex justify-center">
        <ApplicationLogo />
      </div>
      <div>
        <Login />
      </div>
    </section>
  );
};

export default Homepage;
