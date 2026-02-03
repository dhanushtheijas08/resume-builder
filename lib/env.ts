type EnvKey =
  | "RESUME_TEMPLATES_API_URL"
  | "USER_RESUMES_BUCKET_NAME"
  | "USER_RESUMES_BUCKET_ENDPOINT"
  | "USER_RESUMES_BUCKET_ACCESS_KEY_ID"
  | "USER_RESUMES_BUCKET_SECRET_ACCESS_KEY"
  | "CHROMIUM_PACK_URL"
  | "NEXT_PUBLIC_RESUME_TEMPLATES_API_URL";

export const getEnv = (key: EnvKey): string => {
  const value = process.env[key];
  if (!value || value.trim() === "") {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};
