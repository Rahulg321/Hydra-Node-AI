"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

const RefreshCourseButton = () => {
    const router = useRouter();

    return (
        <Button
            onClick={() => {
                // router.refresh();
                window.location.reload();
            }}
            className="text-white"
        >
            Refresh Database
        </Button>
    );
};

export default RefreshCourseButton;
