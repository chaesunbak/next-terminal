import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import type { Attachment } from "ai";

const FileSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "파일 크기는 5MB 이하여야 합니다",
    })
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/gif", "application/pdf"].includes(
          file.type,
        ),
      {
        message: "JPEG, PNG, GIF 또는 PDF 파일만 업로드 가능합니다",
      },
    ),
});

export function useFileUpload() {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [uploadQueue, setUploadQueue] = useState<string[]>([]);

  const processFile = async (file: File): Promise<Attachment | null> => {
    try {
      // 파일 유효성 검사
      const validatedFile = FileSchema.safeParse({ file });

      if (!validatedFile.success) {
        const errorMessage = validatedFile.error.errors[0].message;
        toast.error(errorMessage);
        setErrors((prev) => [...prev, errorMessage]);
        return null;
      }

      // 파일을 Data URL로 변환
      return new Promise<Attachment>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target?.result as string;
          resolve({
            url: dataUrl,
            name: file.name,
            contentType: file.type,
          });
        };
        reader.onerror = () => {
          reject(new Error("파일 읽기 실패"));
        };
        reader.readAsDataURL(file);
      });
    } catch (err) {
      const errorMessage = "파일 처리 중 오류가 발생했습니다";
      toast.error(errorMessage);
      setErrors((prev) => [...prev, errorMessage]);
      console.error(err);
      return null;
    }
  };

  const handleFilesUpload = async (files: File[]) => {
    setUploadQueue(files.map((file) => file.name));

    try {
      const processPromises = files.map((file) => processFile(file));
      const results = await Promise.all(processPromises);

      const validAttachments = results.filter(
        (att): att is Attachment => att !== null,
      );

      setAttachments((prev) => [...prev, ...validAttachments]);
      return validAttachments;
    } catch (error) {
      console.error("Error processing files", error);
      toast.error("파일 처리 중 오류가 발생했습니다");
    } finally {
      setUploadQueue([]);
    }

    return [];
  };

  const clearAttachments = () => {
    setAttachments([]);
  };

  return {
    attachments,
    uploadQueue,
    errors,
    handleFilesUpload,
    clearAttachments,
    setAttachments,
  };
}
