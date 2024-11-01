export const env = {
  RESEND_API_KEY: process.env.RESEND_API_KEY || "",
};

if (!env.RESEND_API_KEY)
  // eslint-disable-next-line no-console
  console.warn("RESEND_API_KEY is not set. Some features may not work correctly.");
