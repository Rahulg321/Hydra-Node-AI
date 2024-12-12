"use client";

import React, { useCallback, useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UpdateExamCoverVideo } from "@/actions/update-exam-cover-video";

const UploadExamCoverVideoFormSchema = z.object({
  video: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload a video")
    .refine(
      (file) => ["video/mp4", "video/quicktime"].includes(file.type),
      "Only MP4 and MOV video formats are supported",
    )
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "Video must be less than 50MB",
    ),
});

export type UploadExamCoverVideoType = z.infer<
  typeof UploadExamCoverVideoFormSchema
>;

const UploadExamCoverVideoForm = ({
  examId,
  setDialogOpenState,
}: {
  examId: string;
  setDialogOpenState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [preview, setPreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const form = useForm<UploadExamCoverVideoType>({
    resolver: zodResolver(UploadExamCoverVideoFormSchema),
    mode: "onBlur",
    defaultValues: {
      video: new File([""], "filename"),
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          const duration = video.duration;
          setVideoDuration(duration);

          if (duration > 15) {
            form.setError("video", {
              type: "manual",
              message: "Video must be 15 seconds or less",
            });
          } else {
            form.setValue("video", file);
            form.clearErrors("video");
            setPreview(URL.createObjectURL(file));
            // Set form as valid
            form.trigger("video");
          }
        };

        video.src = URL.createObjectURL(file);
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 50 * 1024 * 1024, // 50MB
      accept: { "video/mp4": [], "video/quicktime": [] },
    });

  const onSubmit = async (values: UploadExamCoverVideoType) => {
    startTransition(async () => {
      try {
        const blobName = `video-${Date.now()}-${values.video.name}`;

        const formData = new FormData();
        formData.append("video", values.video);
        formData.append("fileName", blobName);

        const response = await UpdateExamCoverVideo(formData, examId);

        if (response.success) {
          console.log("Video uploaded successfully", response.videoUrl);

          toast({
            title: "Video uploaded successfully 🎉",
            description: response.message || "Successfully Completed Action",
          });

          setDialogOpenState(false);
        } else {
          toast({
            title: "ERROR 🥲",
            variant: "destructive",
            description: response.message || "Server Side Error Occurred",
          });
        }
      } catch (error) {
        console.error("An error occurred while trying to upload video", error);
        toast({
          title: "Could not upload video 🥲",
          variant: "destructive",
          description: "An error occurred, please try again later!",
        });
      }
    });
  };

  useEffect(() => {
    form.trigger("video");
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="video"
          render={() => (
            <FormItem className="mx-auto md:w-2/3">
              <FormLabel>
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your exam cover video
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed border-gray-300 p-8 shadow-sm hover:border-gray-400"
                >
                  {preview ? (
                    <video
                      src={preview}
                      controls
                      className="max-h-[400px] rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Video className="h-24 w-24 text-gray-400" />
                  )}
                  <Input {...getInputProps()} />
                  {isDragActive ? (
                    <p className="text-sm text-gray-600">Drop the video here</p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      Click here or drag a video to upload (MP4 or MOV, max 15
                      seconds, up to 50MB)
                    </p>
                  )}
                </div>
              </FormControl>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p className="text-sm text-red-500">
                    Video must be MP4 or MOV format, less than 50MB, and 15
                    seconds or less
                  </p>
                )}
                {videoDuration !== null && videoDuration > 15 && (
                  <p className="text-sm text-red-500">
                    Video duration: {videoDuration.toFixed(2)} seconds. Please
                    upload a video that is 15 seconds or less.
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={
            isPending ||
            !form.formState.isValid ||
            !form.getValues("video").size
          }
          className="mx-auto block h-auto rounded-lg"
        >
          {isPending ? "Uploading..." : "Upload Video"}
        </Button>
      </form>
    </Form>
  );
};

export default UploadExamCoverVideoForm;
