import { BarChart3 } from "lucide-react";
import { CardBase } from "./card-base";

interface Vendor {
  name: string;
  count: number;
}

interface FavoriteVendorsCardProps {
  vendors: Vendor[];
  className?: string;
}

export function FavoriteVendorsCard({
  vendors,
  className,
}: FavoriteVendorsCardProps) {
  // Find the maximum count to calculate relative bar widths
  const maxCount = Math.max(...vendors.map((v) => v.count));

  return (
    <CardBase
      title="FAVORITE VENDORS"
      icon={<BarChart3 className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 space-y-4">
        {vendors.map((vendor) => (
          <div key={vendor.name} className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">
              {vendor.name}
            </span>
            <div className="flex items-center gap-3">
              <div
                className="h-4 rounded-full bg-orange-500"
                style={{ width: `${(vendor.count / maxCount) * 120}px` }}
              ></div>
              <span className="text-white">{vendor.count}</span>
            </div>
          </div>
        ))}
      </div>
    </CardBase>
  );
}
