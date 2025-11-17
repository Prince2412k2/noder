"use client";

import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

const Page = () => {
  const trpc = useTRPC();
  const testAi = useMutation(
    trpc.testAi.mutationOptions({
      onSuccess: () => {
        toast.success("Success");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    }),
  );
  return (
    <Button onClick={() => testAi.mutate()}>Click to test Subscription</Button>
  );
};

export default Page;
