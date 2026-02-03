import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getEnv } from "./env";

type ContentType = "application/pdf" | "image/png" | "image/jpeg" | string;

type UploadFileParams = {
  fileBuffer: Uint8Array<ArrayBufferLike>;
  key: string;
  contentType: ContentType;
  metadata?: Record<string, string>;
};

type GetSignedUrlParams = {
  key: string;
  fileName?: string;
  expiresIn?: number;
  forDownload?: boolean;
};

type UploadResumeParams = {
  fileBuffer: Uint8Array<ArrayBufferLike>;
  userId: string;
  resumeId: string;
  fileName: string;
};

const DEFAULT_EXPIRY = 60 * 1; // 1 minute
const getBucketName = () => getEnv("USER_RESUMES_BUCKET_NAME");

const R2Client = new S3Client({
  region: "auto",
  endpoint: getEnv("USER_RESUMES_BUCKET_ENDPOINT"),
  credentials: {
    accessKeyId: getEnv("USER_RESUMES_BUCKET_ACCESS_KEY_ID"),
    secretAccessKey: getEnv("USER_RESUMES_BUCKET_SECRET_ACCESS_KEY"),
  },
});

export const uploadFile = async ({
  fileBuffer,
  key,
  contentType,
  metadata = {},
}: UploadFileParams): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    Body: fileBuffer,
    ContentType: contentType,
    Metadata: metadata,
  });

  await R2Client.send(command);
  return key;
};

export const getSignedFileUrl = async ({
  key,
  fileName,
  expiresIn = DEFAULT_EXPIRY,
  forDownload = true,
}: GetSignedUrlParams): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ...(forDownload &&
      fileName && {
        ResponseContentDisposition: `attachment; filename="${fileName}"`,
      }),
  });

  return getSignedUrl(R2Client, command, { expiresIn });
};

export const generateResumeKey = (
  userId: string,
  resumeId: string,
  fileName: string,
): string => {
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9-_]/g, "_");
  return `resumes/${userId}/${resumeId}/${sanitizedFileName}-${Date.now()}.pdf`;
};

export const uploadResumePdf = async ({
  fileBuffer,
  userId,
  resumeId,
  fileName,
}: UploadResumeParams): Promise<string> => {
  const key = generateResumeKey(userId, resumeId, fileName);

  return uploadFile({
    fileBuffer,
    key,
    contentType: "application/pdf",
    metadata: {
      resumeId,
      userId,
      fileName,
    },
  });
};

export const getResumeDownloadUrl = async (
  key: string,
  fileName: string,
  expiresIn = DEFAULT_EXPIRY,
): Promise<string> => {
  return getSignedFileUrl({
    key,
    fileName: fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`,
    expiresIn,
    forDownload: true,
  });
};
