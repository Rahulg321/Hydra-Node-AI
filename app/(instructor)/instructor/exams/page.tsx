import Link from "next/link";
import {
  Search,
  Video,
  Users,
  BookOpen,
  BarChart2,
  HelpCircle,
  Plus,
  ArrowRight,
  Clock,
  FileQuestion,
  DollarSign,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import NotebookIllustration from "@/public/illustrations/notebook.svg";
import QuestionsIllustration from "@/public/illustrations/questions.svg";
import OnlineLearningIllustration from "@/public/illustrations/online-learning.svg";
import { Suspense } from "react";
import { Exam } from "@prisma/client";
import { VendorExamCardSkeleton } from "@/components/skeletons/vendor-exam-card-skeleton";
export default async function ExamsPage() {
  const session = await auth();

  // If the user is not authenticated, redirect to login.
  if (!session) {
    return redirect("/login");
  }

  const userId = session.user.id;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Exam</h1>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Input placeholder="Search your exams" className="w-[300px]" />
            <Select defaultValue="newest">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild>
            <Link href={"/exam/create"}>
              <Plus className="mr-2 h-4 w-4" />
              New Exam
            </Link>
          </Button>
        </div>
      </div>

      {/* Alerts */}
      <div className="mb-8 space-y-4">
        <Alert>
          <AlertTitle className="text-base font-medium">
            We&apos;ve upgraded our exam creation tools!
          </AlertTitle>
          <AlertDescription>
            With our latest improvements, new question types, and AI features,
            you can create even better certification prep exams.
            <Button variant="link" className="ml-2 h-auto p-0">
              Learn more
            </Button>
          </AlertDescription>
        </Alert>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <VendorExamCardSkeleton />
            <VendorExamCardSkeleton />
            <VendorExamCardSkeleton />
          </div>
        }
      >
        <FetchUserVendorExams userId={userId!} />
      </Suspense>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Create Engaging Exam Section */}
        <Card>
          <CardContent className="flex items-center gap-8 p-6">
            <div className="w-1/3">
              <Image
                src={NotebookIllustration}
                width={200}
                height={200}
                alt="Create exam illustration"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold">
                Create an Engaging Exam
              </h2>
              <p className="mb-4 text-muted-foreground">
                Whether you&apos;re an experienced instructor or creating your
                first exam, our platform makes it easy to create engaging and
                effective assessments. We&apos;ve compiled resources and best
                practices to help you succeed.
              </p>
              <Button>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Image
                  src={QuestionsIllustration}
                  width={150}
                  height={150}
                  alt="Create question banks illustration"
                  className="w-1/3"
                />
                <div>
                  <h3 className="mb-2 text-xl font-bold">
                    Create Question Banks
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Build comprehensive question banks with various types of
                    questions. Use our tools to create, organize, and manage
                    your exam content.
                  </p>
                  <Button variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Image
                  src={QuestionsIllustration}
                  width={150}
                  height={150}
                  alt="Audience building illustration"
                  className="w-1/3"
                />
                <div>
                  <h3 className="mb-2 text-xl font-bold">
                    Build Your Audience
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Set your exam up for success by understanding your target
                    audience and optimizing your content for maximum reach.
                  </p>
                  <Button variant="outline">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Instructor Resources</h2>
          <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            <ResourceCard
              icon={Video}
              title="Test Preview"
              description="Preview your exam from a student's perspective and get expert feedback."
            />
            <ResourceCard
              icon={Users}
              title="Instructor Community"
              description="Connect with experienced instructors and share knowledge."
            />
            <ResourceCard
              icon={BookOpen}
              title="Teaching Center"
              description="Learn about best practices for creating effective assessments."
            />
            <ResourceCard
              icon={BarChart2}
              title="Analytics Insights"
              description="Understand your exam performance and student engagement."
            />
            <ResourceCard
              icon={HelpCircle}
              title="Help & Support"
              description="Get assistance from our dedicated support team."
            />
          </div>
        </div>

        {/* New Instructor Challenge */}
        <Card>
          <CardContent className="flex items-center gap-8 p-6">
            <div className="w-1/4">
              <Image
                src={OnlineLearningIllustration}
                width={150}
                height={150}
                alt="Instructor challenge illustration"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="mb-4 text-2xl font-bold">
                Join the New Instructor Challenge!
              </h2>
              <p className="mb-4 text-muted-foreground">
                Get exclusive tips and resources designed to help you launch
                your first exam faster! Eligible instructors who publish their
                first exam on time will receive a special bonus.
              </p>
              <Button>
                Start the Challenge
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

async function FetchUserVendorExams({ userId }: { userId: string }) {
  const userVendor = await db.vendor.findUnique({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      name: true,
      isUserVendor: true,
    },
  });

  // If user is a vendor, fetch their exams; otherwise, empty array.
  const vendorExams = userVendor?.isUserVendor
    ? await db.exam.findMany({
        where: {
          vendorId: userVendor.id,
        },
      })
    : [];

  return (
    <div>
      {/* Vendor Exams Section */}
      {userVendor?.isUserVendor ? (
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold">Your Exams</h2>
          {vendorExams.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vendorExams.map((exam) => (
                <VendorExamCard key={exam.id} exam={exam} />
              ))}
            </div>
          ) : (
            <p>No exams found. Create your first exam!</p>
          )}
        </div>
      ) : (
        <div className="mb-8">
          <p className="text-muted-foreground">
            You are not currently registered as a vendor. If you&apos;d like to
            create and manage exams, please create new exam.
          </p>
        </div>
      )}
    </div>
  );
}

interface ExamCardProps {
  exam: Exam;
}

function VendorExamCard({ exam }: ExamCardProps) {
  return (
    <Card className="flex flex-col dark:bg-muted">
      <CardHeader>
        <CardTitle>{exam.name}</CardTitle>
        {exam.subtitle && (
          <p className="text-sm text-muted-foreground">{exam.subtitle}</p>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4" />
            {exam.timeAllowed} minutes
          </div>
          <div className="flex items-center text-sm">
            <FileQuestion className="mr-2 h-4 w-4" />
            {exam.questionsToShow} questions
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4" />${exam.price.toFixed(2)}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/instructor/exam/${exam.id}/manage/basics`}>
            Manage Exam
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ResourceCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader>
        <Icon className="mb-2 h-6 w-6 text-primary" />
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
