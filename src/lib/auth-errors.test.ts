import { describe, it, expect } from "vitest";
import { loginErrorMessage } from "./auth-errors";

describe("login error messages", () => {
  it("unknown email", () =>
    expect(loginErrorMessage("Invalid login credentials", false)).toBe("Email not found. Please sign up."));
  it("wrong password", () =>
    expect(loginErrorMessage("Invalid login credentials", true)).toBe("Wrong password. Please try again."));
  it("unconfirmed email", () =>
    expect(loginErrorMessage("Email not confirmed", true)).toBe("Please confirm your email first. Check inbox."));
});
