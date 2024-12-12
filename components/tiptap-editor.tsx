"use client";

import { useEffect, useState } from "react";
import { Content } from "@tiptap/react";
import { MinimalTiptapEditor } from "./minimal-tiptap";

const TipTapEditor = ({ questionString }: { questionString?: Content }) => {
  const [value, setValue] = useState<Content>(
    questionString ? questionString : "",
  );

  console.log("value", value);

  return (
    <div>
      <MinimalTiptapEditor
        value={value}
        onChange={setValue}
        className="w-full"
        editorContentClassName="p-5"
        output="html"
        placeholder="Type your description here..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-none"
      />
    </div>
  );
};

export default TipTapEditor;
