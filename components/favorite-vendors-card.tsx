import { BarChart3 } from "lucide-react";
import { CardBase } from "./card-base";
import { getTopFiveVendorsForUser } from "@/prisma/queries";

interface FavoriteVendorsCardProps {
  userId: string;
  className?: string;
}

export async function FavoriteVendorsCard({
  userId,
  className,
}: FavoriteVendorsCardProps) {
  const favoriteVendors = await getTopFiveVendorsForUser(userId);
  const maxCount = Math.max(...favoriteVendors.map((v) => v.count));

  return (
    <CardBase
      title="FAVORITE VENDORS"
      icon={<BarChart3 className="h-5 w-5" />}
      className={className}
    >
      <div className="mt-4 min-h-full space-y-4">
        {favoriteVendors.map((vendor) => (
          <div key={vendor.name} className="flex items-center justify-between">
            <span className="text-xl font-semibold text-white">
              {vendor.name}
            </span>
            <div className="flex w-full max-w-[200px] items-center gap-3">
              <div className="relative w-full">
                <div
                  className="ml-auto h-4 rounded-full bg-orange-500"
                  style={{
                    width: `${(vendor.count / maxCount) * 100}%`,
                    float: "left",
                  }}
                ></div>
              </div>
              <span className="whitespace-nowrap text-white">
                {vendor.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </CardBase>
  );
}
