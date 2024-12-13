import { BookOpen, MessageCircle, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  const resources = [
    {
      icon: BookOpen,
      title: "Teaching Center",
      description:
        "Find articles on Udemy teaching — from course creation to marketing.",
      href: "#teaching-center",
    },
    {
      icon: MessageCircle,
      title: "Instructor Community",
      description:
        "Share your progress and ask other instructors questions in our community.",
      href: "#instructor-community",
    },
    {
      icon: HeartHandshake,
      title: "Help and Support",
      description:
        "Can't find what you need? Our support team is happy to help.",
      href: "#help-support",
    },
  ];

  return (
    <section className="px-4 py-12 md:px-6">
      <h1 className="mb-12 text-4xl font-bold text-[#2D3B45]">Resources</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Link
            key={resource.title}
            href={resource.href}
            className="block rounded-lg border p-6 transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <resource.icon className="mb-6 h-12 w-12 text-gray-700" />
              <h2 className="mb-3 text-xl font-semibold text-gray-900">
                {resource.title}
              </h2>
              <p className="text-gray-600">{resource.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
