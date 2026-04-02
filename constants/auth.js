export const clerkPublishableKey = (
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || ""
).trim();

export const hasClerkPublishableKey = Boolean(clerkPublishableKey);
