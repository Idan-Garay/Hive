"use client";
import { Button } from "~/components/ui/button";
import { DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { HiveDoB } from "./_components/hive-dob";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "~/components/ui/form";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  // YYYY - MM - DD;
  dateOfBirth: z.string().date(),
});

export default function SignupPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "2024-12-12",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-full max-h-full">
          <Image
            src="/x-icon.svg"
            alt="x-icon"
            width={32}
            height={32}
            className="absolute left-1/2 top-3 -translate-x-1/2"
          />
          <div className="flex h-full flex-col px-8 pt-10">
            <DialogTitle className="text-3xl font-bold">
              Create your account
            </DialogTitle>
            <div className="h-8" />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="h-6"></div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="h-6"></div>

            <HiveDoB formSetValue={form.setValue} />
            <Button type="submit" className="mt-auto font-semibold">
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
