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
      className="bg-base text-white p-4 rounded-2xl"
    >
      <div className="flex justify-between items-center">
        <h4>{heading}</h4>
        <div className="text-2xl">
          <MdOutlineKeyboardArrowDown />
        </div>
      </div>
      {open ? (
        <div>
          <span>{tagline}</span>
        </div>
      ) : null}
    </div>
  );
};

export default FaqCard;
