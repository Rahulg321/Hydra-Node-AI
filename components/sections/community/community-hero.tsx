import { Button } from "@/components/ui/button";

export function CommunityHero() {
  return (
    <section className="py-12 text-center">
      <h1 className="mb-4 text-4xl font-bold">Welcome to Our Community</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Join a vibrant network of learners, creators, and innovators.
      </p>
      <Button size="lg">Get Started</Button>
    </section>
  );
}
