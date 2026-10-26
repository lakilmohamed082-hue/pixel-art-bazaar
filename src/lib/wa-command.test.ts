import { describe, it, expect } from "vitest";
import { parseWaCommand } from "./wa-command";

describe("parseWaCommand", () => {
  it("extracts number from Darija command", () => {
    expect(parseWaCommand("بدل النمرة ل +212612345678")).toBe("212612345678");
  });
  it("ignores unrelated text", () => {
    expect(parseWaCommand("salam")).toBeNull();
  });
});
