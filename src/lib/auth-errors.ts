export const LOGIN_MESSAGES = {
  empty: "Please fill email and password",
  notFound: "Email not found. Please sign up.",
  wrongPassword: "Wrong password. Please try again.",
  notConfirmed: "Please confirm your email first. Check inbox.",
} as const;

/** Maps a sign-in error to a friendly message. `emailExists` tells us whether the account exists. */
export function loginErrorMessage(errorMessage: string, emailExists: boolean): string {
  const m = errorMessage.toLowerCase();
  if (m.includes("not confirmed")) return LOGIN_MESSAGES.notConfirmed;
  if (m.includes("invalid login credentials")) {
    return emailExists ? LOGIN_MESSAGES.wrongPassword : LOGIN_MESSAGES.notFound;
  }
  return errorMessage;
}
