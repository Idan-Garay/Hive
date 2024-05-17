"use client";
import { Button } from "~/components/ui/button";
import { DialogClose, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import Image from "next/image";
import { HiveDoB } from "./hive-dob";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { signUp1Schema } from "~/app/schemas/sign-up-schema";
import { api } from "~/trpc/react";
import { cn } from "~/lib/utils";
import { HiveLoading } from "~/components/hive/hive-loading";
import { Cross2Icon } from "@radix-ui/react-icons";

export const CreateAccountForm = (
  _props: CreateAccountFormProps
): JSX.Element => {
  const form = useForm<z.infer<typeof signUp1Schema>>({
    resolver: zodResolver(signUp1Schema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "2024-12-12",
    },
  });

  const createAccount = api.user.createAccount.useMutation({
    onSuccess: () => {
      console.log("here");
    },
    onError: (error) => {
      form.setError("email", { message: error.message });
    },
  });

  const getEmail = api.user.getAccountEmail.useQuery(form.getValues().email, {
    enabled: false,
  });

  async function onSubmit(values: z.infer<typeof signUp1Schema>) {
    try {
      const res = await createAccount.mutateAsync(values);
      console.log({ res });
    } catch (error) {
      console.error(error, "er2");
    }
    //
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="h-full max-h-full">
          <DialogClose className="absolute left-5 top-5">
            <Cross2Icon className="size-5" />
          </DialogClose>
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
              render={({ field, fieldState }) => (
                <FormItem className="relative">
                  <FormControl
                    onBlur={async () => {
                      await getEmail.refetch();
                      if (getEmail.data) {
                        form.setError("email", {
                          message: "Email has already been taken.",
                        });
                      }
                    }}
                  >
                    <Input
                      className={cn({
                        "border-[1.5px] border-destructive": fieldState.error,
                      })}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute mt-1 pl-2 font-medium" />
                </FormItem>
              )}
            />
            <div className="h-6"></div>

            <HiveDoB
              setFormDob={(dob: string) => {
                form.setValue("dateOfBirth", dob);
              }}
            />
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit"
              className="mt-auto font-semibold"
            >
              {form.formState.isSubmitting ? <HiveLoading /> : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export type CreateAccountFormProps = {
  className?: string;
};
