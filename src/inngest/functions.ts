import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("getting transcriptions", "5000");
    await step.sleep("sending to ai", "5000");
    await step.sleep("parsing", "5000");
    await step.run("create-workflow", () => { return prisma.workflow.create({ data: { name: "innjest-from-workflow" } }) })
  },
);
