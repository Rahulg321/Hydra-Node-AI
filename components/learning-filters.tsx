"use client";

import { useRef, useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const FilterDropdown = ({
  label,
  options,
  value,
  onChange,
  className,
}: FilterDropdownProps) => {
  return (
    <div className="relative">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-1.5 text-sm text-white",
              className,
            )}
          >
            <span>{value || label}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 bg-neutral-800">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className="text-sm text-white hover:bg-neutral-700 focus:bg-neutral-700"
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

interface LearningFiltersProps {
  onFilterChange?: (filters: {
    vendor: string;
    result: string;
    mode: string;
    sortBy: string;
  }) => void;
  className?: string;
}

export function LearningFilters({
  onFilterChange,
  className,
}: LearningFiltersProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isResetting, startResetTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const vendorQuery = searchParams.get("vendor")?.toString();

  const [filters, setFilters] = useState({
    vendor: "",
    result: "",
    mode: "",
    sortBy: "Recent",
  });

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    startTransition(async () => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
      onFilterChange?.(newFilters);
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const handleReset = () => {
    startResetTransition(async () => {
      const resetFilters = {
        vendor: "",
        result: "",
        mode: "",
        sortBy: "Recent",
      };
      setFilters(resetFilters);
      onFilterChange?.(resetFilters);
      const params = new URLSearchParams(searchParams);
      console.log("Resetting filters", params);
      params.delete("vendor");
      params.delete("result");
      params.delete("mode");
      params.delete("sortBy");
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const vendorOptions = [
    { label: "All Vendors", value: "all-vendors" },
    { label: "Google", value: "Google" },
    { label: "Cisco", value: "Cisco" },
    { label: "IBM", value: "IBM" },
    { label: "Microsoft", value: "Microsoft" },
    { label: "Amazon", value: "Amazon" },
    { label: "Apple", value: "Apple" },
    { label: "Oracle", value: "Oracle" },
    { label: "Salesforce", value: "Salesforce" },
    { label: "Snowflake", value: "Snowflake" },
    { label: "VMware", value: "VMware" },
  ];

  const resultOptions = [
    { label: "All Results", value: "" },
    { label: "Passed", value: "passed" },
    { label: "Failed", value: "failed" },
  ];

  const modeOptions = [
    { label: "All Modes", value: "" },
    { label: "Practice", value: "PRACTICE" },
    { label: "Mock", value: "MOCK" },
  ];

  const sortOptions = [
    { label: "Recent", value: "recent" },
    { label: "Oldest", value: "oldest" },
  ];

  return (
    <div
      data-pending={isPending ? "" : undefined}
      className={cn(
        "flex w-full flex-wrap items-center justify-between gap-4 px-6 py-4",
        className,
      )}
    >
      <h4 className="font-medium text-white">My Learnings</h4>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <h5 className="text-white">Filter by</h5>
          <FilterDropdown
            label="Vendors"
            options={vendorOptions}
            value={filters.vendor}
            onChange={(value) => handleFilterChange("vendor", value)}
          />
          <FilterDropdown
            label="Results"
            options={resultOptions}
            value={filters.result}
            onChange={(value) => handleFilterChange("result", value)}
          />
          <FilterDropdown
            label="Mode"
            options={modeOptions}
            value={filters.mode}
            onChange={(value) => handleFilterChange("mode", value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <h5 className="text-white">Sort by</h5>
          <FilterDropdown
            label="Recent"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange("sortBy", value)}
          />
        </div>

        <button
          onClick={handleReset}
          className="rounded-full bg-neutral-700 px-4 py-1.5 text-sm text-white hover:bg-neutral-600"
          disabled={isResetting}
        >
          {isResetting ? "Resetting..." : "Reset"}
        </button>
      </div>
    </div>
  );
}
