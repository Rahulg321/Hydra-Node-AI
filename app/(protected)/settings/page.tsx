import { auth } from "@/auth";
import SettingsHero from "@/components/sections/settings/SettingsHero";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <React.Fragment>
      <div className="block-space-large">
        <h3>{JSON.stringify(session)}</h3>
      </div>
      <SettingsHero />
    </React.Fragment>
  );
};

export default page;
