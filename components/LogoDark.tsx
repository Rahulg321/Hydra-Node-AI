import React from "react";

const LogoDark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      width="800"
      height="182"
      viewBox="0 0 800 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M50 0L100 90L50 182L0 90L50 0Z" fill="#00A3FF" />
      <path d="M150 45L200 135L150 182L100 90L150 45Z" fill="#0082CC" />
      <foreignObject x="250" y="48" width="550" height="120">
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "72px",
            fontWeight: "bold",
            color: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            height: "100%",
          }}
        >
          HYDRANODE
        </div>
      </foreignObject>
    </svg>
  );
};

export default LogoDark;
