import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const TokenScheduleSection = () => {
  const data = [
    {
      category: "Pre-Seed",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "6 Months",
      description: "Linear Vesting",
    },
    {
      category: "Seed",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "9 Months",
      description: "Linear Vesting",
    },
    {
      category: "Private Sale",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "12 Months",
      description: "Linear Vesting",
    },
    {
      category: "Pre-Seed",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "6 Months",
      description: "Linear Vesting",
    },
    {
      category: "Strategic IDO Round 1",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "18 Months",
      description: "Linear Vesting",
    },
    {
      category: "Strategic IDO Round 2",
      allocation: "5%",
      cliff: "3 Months",
      vesting: "18 Months",
      description: "Linear Vesting",
    },
    {
      category: "Public Sale",
      allocation: "5%",
      cliff: "Fully Unlocked",
      vesting: "Fully Unlocked",
      description: "Linear Vesting",
    },
    {
      category: "Team",
      allocation: "10%",
      cliff: "6 Months",
      vesting: "24 Months",
      description: "Linear Vesting",
    },
    {
      category: "Advisory",
      allocation: "5%",
      cliff: "6 Months",
      vesting: "24 Months",
      description: "Linear Vesting",
    },
    {
      category: "Liquidity",
      allocation: "15%",
      cliff: "Locked, unlocked only based on market demands.",
      vesting: "",
      description:
        "Locked, unlocked only based on market demands. For example future launching on new chains",
    },
    {
      category: "Staking, Rewards and Governance",
      allocation: "15%",
      cliff: "Locked, unlocked only based on market demands.",
      vesting: "",
      description: "Unlocked based on staking rewards. Liquidity mining etc.",
    },
    {
      category: "Ecosystem Fund",
      allocation: "15%",
      cliff: "Locked, unlocked only based on market demands.",
      vesting: "",
      description: "Locked, unlocked based on market demands.",
    },
  ];

  return (
    <section className="block-space big-container">
      <div className="mb-4 text-center lg:mb-12">
        <h2>
          Vesting{" "}
          <span className="via-[#AF89EE]/80.89% ml-2 bg-gradient-to-r from-[#AF89EE] to-[#5153D7] bg-clip-text text-transparent">
            Schedule
          </span>
        </h2>
        <p className="">
          By participating in crypto staking, users can secure additional
          benefits while <br /> contributing to the stability and security of
          the HydraNode ecosystem.
        </p>
      </div>
      <Table className="w-full border border-gray-200 bg-white">
        <TableCaption className="py-4 text-center text-xl font-bold">
          Vesting Schedule
        </TableCaption>
        <TableHeader className="bg-blue-100 text-blue-800">
          <TableRow>
            <TableHead className="border-b border-gray-200 px-4 py-2">
              Category
            </TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">
              Allocation
            </TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">
              Cliff
            </TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">
              Vesting
            </TableHead>
            <TableHead className="border-b border-gray-200 px-4 py-2">
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-gray-100">
              <TableCell className="border-b border-gray-200 px-4 py-2 font-medium">
                {item.category}
              </TableCell>
              <TableCell className="border-b border-gray-200 px-4 py-2">
                {item.allocation}
              </TableCell>
              <TableCell className="border-b border-gray-200 px-4 py-2">
                {item.cliff}
              </TableCell>
              <TableCell className="border-b border-gray-200 px-4 py-2">
                {item.vesting}
              </TableCell>
              <TableCell className="border-b border-gray-200 px-4 py-2">
                {item.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default TokenScheduleSection;
