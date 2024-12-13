import { MonitorPlay, Sparkles, Tag } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
  const tools = [
    {
      icon: MonitorPlay,
      title: "Test Video",
      description:
        "Get free feedback from Udemy video experts on your audio, video, and delivery.",
      href: "#test-video",
    },
    {
      icon: Sparkles,
      title: "Marketplace Insights",
      description: "Get Udemy-wide market data to create successful courses.",
      href: "#marketplace-insights",
    },
    {
      icon: Tag,
      title: "Bulk coupon creation",
      description: "Create multiple coupons at once via CSV upload.",
      href: "#bulk-coupons",
    },
  ];

  return (
    <section className="px-4 py-12 md:px-6">
      <h1 className="mb-12 text-4xl font-bold text-[#2D3B45]">Tools</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className="block rounded-lg border p-6 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <tool.icon className="mb-6 h-12 w-12 text-gray-700" />
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                {tool.title}
              </h2>
              <p className="text-gray-600">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
