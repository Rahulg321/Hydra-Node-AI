import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Upload,
  DollarSign,
  BarChart2,
  Users,
  FileSpreadsheet,
  PenTool,
  Zap,
} from "lucide-react";

export default function CreatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold">
          Create and Sell Your Own Exams
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Turn your knowledge into profit with our powerful exam creation
          platform
        </p>
        <Button asChild>
          <Link href={"/instructor"}>Start Creating Now</Link>
        </Button>
      </section>

      <section className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          icon={<Upload className="h-8 w-8" />}
          title="Easy Upload"
          description="Upload your exam questions via CSV or enter them manually with our user-friendly interface."
        />
        <FeatureCard
          icon={<DollarSign className="h-8 w-8" />}
          title="Monetize Your Expertise"
          description="Set your own prices and earn money from your custom exams and quizzes."
        />
        <FeatureCard
          icon={<BarChart2 className="h-8 w-8" />}
          title="Detailed Analytics"
          description="Track performance and gain insights with our comprehensive analytics dashboard."
        />
        <FeatureCard
          icon={<Users className="h-8 w-8" />}
          title="Grow Your Audience"
          description="Expand your user base and build a following with our integrated marketing tools."
        />
        <FeatureCard
          icon={<FileSpreadsheet className="h-8 w-8" />}
          title="Flexible Formats"
          description="Create various types of exams including multiple choice, true/false, and essay questions."
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8" />}
          title="Instant Feedback"
          description="Provide immediate results and explanations to help users learn and improve."
        />
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <StepCard
            number={1}
            title="Create Your Exam"
            description="Upload a CSV or use our editor to input questions, answers, and explanations."
          />
          <StepCard
            number={2}
            title="Set Your Price"
            description="Decide how much to charge for your exam or offer it for free to build your audience."
          />
          <StepCard
            number={3}
            title="Publish and Promote"
            description="Make your exam live and use our tools to market it to potential test-takers."
          />
        </div>
      </section>

      <section className="mb-16 rounded-lg bg-muted p-8">
        <h2 className="mb-4 text-3xl font-bold">Monetization Options</h2>
        <p className="mb-4">
          Choose how you want to profit from your expertise:
        </p>
        <ul className="mb-4 list-inside list-disc">
          <li>Set a fixed price for each exam</li>
          <li>Offer subscription-based access to all your exams</li>
          <li>Provide free exams with premium features</li>
          <li>Create bundles of related exams at a discounted rate</li>
        </ul>
        <p>
          Our flexible pricing options let you maximize your earnings potential.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Powerful Analytics
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Performance Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc">
                <li>View overall exam performance</li>
                <li>Analyze question-by-question results</li>
                <li>Track user progress over time</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc">
                <li>Understand your audience demographics</li>
                <li>See which topics are most popular</li>
                <li>Identify areas for improvement</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Grow Your User Base</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          Expand your reach and build a loyal following of test-takers
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Social Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              Easily share your exams on social media platforms to attract more
              users.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              Our platform is designed to help your exams rank well in search
              engines.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>User Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              Build credibility with ratings and reviews from satisfied
              test-takers.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Start?</h2>
        <p className="mb-8 text-xl text-muted-foreground">
          Create your first exam today and join our community of educators and
          experts.
        </p>
        <Button size="lg" asChild>
          <Link href="/create/new">Create Your First Exam</Link>
        </Button>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="text-primary-foreground mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-2xl font-bold">
          {number}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
