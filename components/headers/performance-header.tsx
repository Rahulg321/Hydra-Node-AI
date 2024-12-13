import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Overview", href: "/instructor/performance/overview" },
  { name: "Students", href: "/instructor/performance/students" },
  { name: "Reviews", href: "/instructor/performance/reviews" },
  {
    name: "Engagement",
    href: "/instructor/performance/engagement",
    children: [
      {
        name: "Course engagement",
        href: "/instructor/performance/engagement/course",
      },
      {
        name: "Practice test insights",
        href: "/instructor/performance/engagement/practice",
        isNew: true,
      },
    ],
  },
  { name: "Traffic & conversion", href: "/instructor/performance/traffic" },
];

export default function PerformanceHeader() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex-1">
          <ul className="flex justify-start space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                {item.children ? (
                  <div className="group">
                    <button className="flex items-center px-1 py-4 text-sm font-medium">
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 rounded-md bg-muted opacity-0 shadow-lg transition-opacity duration-150 ease-in-out group-hover:opacity-100">
                      <ul className="py-1">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <Link
                              href={child.href}
                              className="block px-4 py-2 text-sm"
                            >
                              {child.name}
                              {child.isNew && (
                                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                  New
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="inline-flex px-1 py-4 text-sm font-medium"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
