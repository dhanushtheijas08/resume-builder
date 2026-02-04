const envVars = {
  RESUME_TEMPLATES_API_URL: process.env.RESUME_TEMPLATES_API_URL,
  USER_RESUMES_BUCKET_NAME: process.env.USER_RESUMES_BUCKET_NAME,
  USER_RESUMES_BUCKET_ENDPOINT: process.env.USER_RESUMES_BUCKET_ENDPOINT,
  USER_RESUMES_BUCKET_ACCESS_KEY_ID:
    process.env.USER_RESUMES_BUCKET_ACCESS_KEY_ID,
  USER_RESUMES_BUCKET_SECRET_ACCESS_KEY:
    process.env.USER_RESUMES_BUCKET_SECRET_ACCESS_KEY,
  CHROMIUM_PACK_URL: process.env.CHROMIUM_PACK_URL,
  NEXT_PUBLIC_RESUME_TEMPLATES_API_URL:
    process.env.NEXT_PUBLIC_RESUME_TEMPLATES_API_URL,
} as const;

export type EnvKey = keyof typeof envVars;

export const getEnv = (key: EnvKey): string => {
  const value = envVars[key];

  if (!value || value.trim() === "") {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};
