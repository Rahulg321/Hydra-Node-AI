/**
 * v0 by Vercel.
 * @see https://v0.dev/t/e8FOZEdMWjs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { FaCircleCheck } from "react-icons/fa6";

export default function PricingCardSection() {
  return (
    <section className="block-space container w-full">
      <div className="grid gap-6 lg:grid-cols-4 lg:gap-8">
        <div className="grid gap-6 rounded-lg border bg-background p-6 shadow-sm">
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold">Starter</h3>
            <span>
              Get a quick overview of our platform through the free trial and
              explore the potential of HydraNode.{" "}
            </span>
            <p className="text-4xl font-bold">$9</p>
            <p className="text-muted-foreground">per month</p>
          </div>
          <ul className="grid gap-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Limited Study Materials Access
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Participation in Basic Contests
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Limited Personalized Learning
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Access to a community Forum
            </li>
          </ul>
          <Button size="lg">Get Started</Button>
        </div>
        <div className="grid gap-6 rounded-lg border bg-background p-6 shadow-sm">
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold">Pro</h3>
            <p className="text-4xl font-bold">$19</p>
            <p className="text-muted-foreground">per month</p>
          </div>
          <ul className="grid gap-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Full access to all study materials
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Participation in all contests
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Full use of personalized learning
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Monthly prog.report & feedback
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Base APY* of 10% for staking Hydranode tokens
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              For additional 2% APY* each additional Associate certification
              completed
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Access to exclusive webinars and workshops
            </li>
          </ul>
          <Button size="lg">Get Started</Button>
        </div>
        <div className="grid gap-6 rounded-lg bg-base p-6 text-primary-foreground shadow-sm">
          <div className="flex items-center justify-between">
            <div className="grid gap-2">
              <h3 className="text-2xl font-bold">Enterprise</h3>
              <p className="text-4xl font-bold">$49</p>
              <p className="text-primary-foreground/80">per month</p>
            </div>
            <div className="rounded-full bg-primary-foreground/20 px-3 py-1 text-xs font-medium">
              Featured
            </div>
          </div>
          <ul className="grid gap-2 text-primary-foreground/80">
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              All faetures from Quarterly Plan
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Access to professional certification programs reward
            </li>

            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Base APY* of 20% for staking Hydranode tokens
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Additional 3% APY* for each additional Professional certification
              completed
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Priority Support
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Early Access to new features and beta programs
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Opportunities for early stage EdTech Investment
            </li>
          </ul>
          <Button size="lg" variant="secondary">
            Get Started
          </Button>
        </div>
        <div className="grid gap-6 rounded-lg border bg-background p-6 shadow-sm">
          <div className="grid gap-2">
            <h3 className="text-2xl font-bold">Enterprise Plus</h3>
            <p className="text-4xl font-bold">$200</p>
          </div>
          <ul className="grid gap-2 text-muted-foreground">
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              All features from The Yearly Plan
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Access to professional certification programs
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Base APY* of 30% for staking Hydranode tokens
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Additional 4% APY* for each additional Specialist certification
              completed
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Lifetime access to all updates and new content
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Participation in exclusive collaboration projects and partnerships
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Higher staking rewards and revenue sharing from the Hydranode
              marketplace
            </li>
            <li className="flex items-center gap-2">
              <FaCircleCheck className="h-4 w-4 fill-primary" />
              Exclusive acceess to invest in promising educational technology
              startups and GameFi opportunities
            </li>
          </ul>
          <Button size="lg">Get Started</Button>
        </div>
      </div>
    </section>
  );
}
