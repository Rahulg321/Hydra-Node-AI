import React from "react";

const Lamp = () => {
  return (
    <div className="absolute top-0">
      <div className="h-1.5 w-[16rem] bg-orange-300 md:w-[20rem]"></div>
      <div className="absolute left-1/2 top-1/2 h-[20rem] w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-40 blur-3xl" />
    </div>
  );
};

export default Lamp;
