"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";
import { useForm } from "react-hook-form";



import z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
  endpoint: z.url({ message: "Please enter a valid URL" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional() // TODO: JSON5 .refine()
});

export type HttpRequestFormValues = z.infer<typeof formSchema>

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: HttpRequestFormValues) => void;
  defaultValues?: Partial<HttpRequestFormValues>
};

export const HttpRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues
}: Props) => {

  const form = useForm<HttpRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      endpoint: defaultValues?.endpoint || "",
      method: defaultValues || "GET",
      body: defaultValues || "",

    }
  })



  useEffect(() => {
    if (open) {
      form.reset({
        endpoint: defaultEndpoint,
        method: defaultMethod,
        body: defaultBody,
      });
    }
  }, [open, defaultEndpoint, defaultMethod, defaultBody, form])
  const watchMethod = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod)

  const handleSubmit = (values: HttpRequestFormValues) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (

    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> HTTP Request </DialogTitle>
          <DialogDescription>
            Configure settings for HTTP Request node.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 mt-4"
          >


            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a mehtod" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST"> POST</SelectItem>
                      <SelectItem value="PUT"> PUT</SelectItem>
                      <SelectItem value="PATCH"> PATCH</SelectItem>
                      <SelectItem value="DELETE"> DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>The HTTP method to use for this request</FormDescription>
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com/users/{{httppResponse.data.id}}"{...field} />
                  </FormControl>
                  <FormDescription>
                    Static URL or use <span className="text-secondary">{"{{variables}}"}</span> for
                    simple values or <span className="text-secondary">{"{{json variable}}"}</span> to stringify objects
                  </FormDescription>
                </FormItem>
              )}

            />

            {showBodyField && (

              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request body</FormLabel>
                    <FormControl>
                      <Textarea placeholder={
                        `{\n  "userId":"{{httppResponse.data.id}}",\n  "name":"{{httppResponse.data.name}}",\n  "items":"{{httppResponse.data.items}}"\n}`
                      } className="min-h-[120px] font-mono text-sm" {...field} />
                    </FormControl>
                    <FormDescription>
                      JSON with template variables. Use <span className="text-secondary">{"{{variables}}"}</span> for
                      simple values or <span className="text-secondary">{"{{json variable}}"}</span> to stringify objects
                    </FormDescription>
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-4">
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
};
