import { describe, expect, it } from "vitest";
import { loadNamespacesFromCache } from "../components/initializer";

describe("Reading and syncing Namespaces", () => {
  it("override country specfic namespaces labels", async () => {
    const labels = await loadNamespacesFromCache(
      ["feature1", "common"],
      "en",
      "US"
    );
    const feature1Namespace = labels["feature1"];
    console.log(labels);

    expect(feature1Namespace["source"]).toBe("en-US");
  });
});
