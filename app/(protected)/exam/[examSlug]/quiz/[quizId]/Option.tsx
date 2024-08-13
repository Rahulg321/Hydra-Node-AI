// "use client";

// import { cn } from "@/lib/utils";
// import { useState } from "react";

// export default function Option({ value }: { value: string }) {
//   const [selected, setSelected] = useState(false);

//   const onClick = () => {
//     setSelected((prevState) => !prevState);
//   };

//   return (
//     <div
//       onClick={onClick}
//       className={cn(
//         "flex cursor-pointer items-center gap-2 rounded-lg border border-base p-4 md:p-6",
//         {
//           "border-white bg-base": selected,
//         },
//       )}
//     >
//       <div
//         className={cn(
//           "size-4 rounded-full border border-base transition duration-75 ease-in",
//           {
//             "border-4 border-white": selected,
//           },
//         )}
//       ></div>
//       <h5
//         className={cn("", {
//           "text-white": selected,
//         })}
//       >
//         {value}
//       </h5>
//     </div>
//   );
// }
