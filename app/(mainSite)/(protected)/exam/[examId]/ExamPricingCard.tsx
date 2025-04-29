import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/hooks/lib/utils";

type ExamPricingCardProps = {
  heading: string;
  headingTag: string;
  tagline: string;
  price: string;
  duration: string;
  isFeatured?: boolean;
};

export function ExamPricingCard({
  heading,
  headingTag,
  tagline,
  price,
  duration,
  isFeatured = false,
}: ExamPricingCardProps) {
  return (
    <Card className={cn(isFeatured && "bg-primary text-primary-foreground")}>
      <CardHeader>
        <div className="text-sm font-medium uppercase">{headingTag}</div>
        <CardTitle className="text-2xl">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {price}
          <span className="text-sm font-normal">/{duration}</span>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">{tagline}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          variant={isFeatured ? "secondary" : "default"}
        >
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
