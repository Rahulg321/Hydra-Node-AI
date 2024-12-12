import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const resources = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics and set up your environment.",
    link: "#",
  },
  {
    title: "Community Forums",
    description: "Ask questions and share your knowledge with others.",
    link: "#",
  },
  {
    title: "Upcoming Events",
    description: "Join webinars, workshops, and meetups.",
    link: "#",
  },
];

export function CommunityResources() {
  return (
    <section className="py-12">
      <h2 className="mb-8 text-center text-3xl font-bold">
        Explore Our Resources
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {resources.map((resource, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resource.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{resource.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <a href={resource.link}>Learn More</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
