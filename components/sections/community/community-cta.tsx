import { Button } from "@/components/ui/button";

export function CommunityCTA() {
  return (
    <section className="rounded-lg bg-accent py-12 text-center">
      <h2 className="mb-4 text-3xl font-bold">Ready to Join?</h2>
      <p className="mb-8 text-xl text-muted-foreground">
        Become a part of our growing community and start your journey today.
      </p>
      <Button size="lg" variant="default">
        Sign Up Now
      </Button>
    </section>
  );
}
