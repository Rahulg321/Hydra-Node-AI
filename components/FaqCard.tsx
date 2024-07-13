"use client";

import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const FaqCard = ({
  heading,
  tagline,
}: {
  heading: string;
  tagline: string;
}) => {
  const [open, setOpen] = useState(false);

  const openChangeHandler = () => {
    setOpen((state) => {
      return !state;
    });
  };

  return (
    <div
      onClick={openChangeHandler}
      className="cursor-pointer rounded-2xl bg-base p-4 text-white"
    >
      <div className="flex items-center justify-between">
        <h4>{heading}</h4>
        <div className="text-2xl">
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      {open ? (
        <div className="mt-4">
          <p className="text-white">{tagline}</p>
        </div>
      ) : null}
    </div>
  );
};

export default FaqCard;
