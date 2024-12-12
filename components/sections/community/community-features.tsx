import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, HelpCircle, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Access Resources",
    description:
      "Explore our extensive library of tutorials, guides, and best practices.",
  },
  {
    icon: HelpCircle,
    title: "Ask Questions",
    description:
      "Get help from experienced community members and experts in our forums.",
  },
  {
    icon: Users,
    title: "Connect with Others",
    description:
      "Network with like-minded individuals and form valuable connections.",
  },
];

export function CommunityFeatures() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">What You Can Do</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <feature.icon className="mb-2 h-10 w-10 text-primary" />
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
