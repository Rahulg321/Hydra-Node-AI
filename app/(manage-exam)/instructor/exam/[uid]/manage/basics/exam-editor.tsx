import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, Video } from "lucide-react";
import ExamInformationForm from "./exam-info-form";
import ExamImageUploadDialog from "@/components/Dialogs/exam-image-upload-dialog";
import ExamVideoUploadDialog from "@/components/Dialogs/exam-video-upload-dialog";
import Image from "next/image";
import db from "@/hooks/lib/db";
import CoverImagePlaceholder from "@/public/placeholder/cover-image-placeholder.webp";
import CoverVideoPlaceholder from "@/public/placeholder/cover-video-placeholder.webp";
import { ExamLevel } from "@prisma/client";
import { ExamTagForm } from "@/components/forms/exam-tag-form";

export default async function ExamEditor({ examId }: { examId: string }) {
  const currentExam = await db.exam.findUnique({
    where: {
      id: examId,
    },
    include: {
      tags: true,
    },
  });

  if (!currentExam) {
    return (
      <div>
        <h2>Could not find Exam</h2>
        <p>Something went wrong</p>
      </div>
    );
  }

  const {
    id,
    name,
    coverImage,
    coverVideo,
    description,
    examLevel,
    category,
    subtitle,
  } = currentExam;

  const examTags = currentExam.tags.map((e) => e.name);

  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Course landing page</h1>
        <p className="mt-2 text-muted-foreground">
          Your course landing page is crucial to your success. If it&apos;s done
          right, it can also help you gain visibility in search engines like
          Google. As you complete this section, think about creating a
          compelling Course Landing Page that demonstrates why someone would
          want to enroll in your course.
        </p>
      </div>

      <ExamInformationForm
        examId={id}
        subtitle={subtitle}
        category={category}
        description={description}
        name={name}
        level={examLevel as ExamLevel}
      />

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Exam Image Upload</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative aspect-video">
            {coverImage ? (
              <Image
                src={coverImage}
                alt="user cover image"
                fill
                className="rounded-lg object-cover"
              />
            ) : (
              <Image
                src={CoverImagePlaceholder}
                alt="placeholderImage"
                className="rounded-lg object-cover"
              />
            )}
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">
              Update your Exam Cover Image
            </h3>
            <ExamImageUploadDialog examId={examId} />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Exam Video Upload</h3>
        <p className="text-sm text-muted-foreground">
          Your promo video is a quick and compelling way for students to preview
          what they&apos;ll learn in your course. Students considering your
          course are more likely to enroll if your promo video is well-made.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative aspect-video">
            {coverVideo ? (
              <video
                src={coverVideo}
                controls
                className="h-full w-full rounded-lg object-cover"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100">
                <Video className="h-12 w-12 text-gray-400" />
                <p className="ml-2 text-sm text-gray-500">No video uploaded</p>
              </div>
            )}
          </div>
          <div>
            <h3 className="mb-2 text-lg font-medium">
              Update your Exam Promo Video
            </h3>
            <ExamVideoUploadDialog examId={examId} />
          </div>
        </div>
      </div>

      <ExamTagForm examId={examId} tags={examTags} />

      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertDescription>
          All visible instructors of this course must complete their profile
          before the course can be published. This includes name, image, and a
          short summary of your background 50 words minimum.
        </AlertDescription>
      </Alert>
    </div>
  );
}
