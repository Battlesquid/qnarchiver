import { describe, expect, it } from "vitest";
import { extractRules } from "../src/modules/rules";

const MANUAL_URL = "https://content.vexrobotics.com/docs/23-24/vrc-overunder/VRC-Manual-2023-24-4.0.pdf";

describe("extractRules", () => {
    it("shall extract all the rules from the game manual", async () => {
        const rules = await extractRules(MANUAL_URL);
        expect(rules).not.toHaveLength(0);
    })
});
