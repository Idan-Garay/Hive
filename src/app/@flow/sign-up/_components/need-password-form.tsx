"use client";
import Image from "next/image";
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
import { passwordSchema } from "~/app/schemas/sign-up-schema";
import { DialogTitle } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import { HiveLoading } from "~/components/hive/hive-loading";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { HiveLink } from "~/components/hive/hive-link";
import { HiveInputSecure } from "~/components/hive/hive-input-secure";
import { useSignupStore } from "../store/signup-store";

export const NeedPasswordForm = (props: NeedPasswordFormProps): JSX.Element => {
  const { email, completeForm } = useSignupStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const updatePassword = api.user.updatePassword.useMutation();

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    const res = await updatePassword.mutateAsync({
      email,
      password: values.password,
    });

    // nextForm();
    completeForm();
    if (res === true) {
    } else {
      toast({
        description: "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form className="size-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex size-full max-h-full flex-col">
          <Image
            src="/x-icon.svg"
            alt="x-icon"
            width={32}
            height={32}
            className="absolute left-1/2 top-3 -translate-x-1/2"
          />
          <div className="flex h-full flex-col px-8 pt-10">
            <DialogTitle className="text-3xl font-bold">
              {"You'll need a password"}
            </DialogTitle>
            <p className="py-1 text-muted-foreground">
              {"Make sure it's 8 characters or more"}
            </p>
            <div className="h-12"></div>
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="relative">
                  <FormControl>
                    <HiveInputSecure
                      className={cn({
                        "border-[1.5px] border-destructive": fieldState.error,
                      })}
                      maxLength={24}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute mt-1 pl-2 font-medium" />
                </FormItem>
              )}
            />
            <div className="h-full"></div>

            <p className="text-sm leading-4 text-muted-foreground">
              By signing up, you agree to the{" "}
              <HiveLink href="https://twitter.com/en/tos">
                Terms of Service
              </HiveLink>{" "}
              and{" "}
              <HiveLink href="https://twitter.com/en/privacy">
                Privacy Policy
              </HiveLink>
              , including{" "}
              <HiveLink href="https://help.twitter.com/en/rules-and-policies/x-cookies">
                Cookie Use
              </HiveLink>
              . Hive may use your contact information, including your email
              address and phone number for purposes outlined in our Privacy
              Policy, like keeping your account secure and personalizing our
              services, including ads.{" "}
              <HiveLink href="https://about.x.com/en">Learn more</HiveLink>.
              Others will be able to find you by email or phone number, when
              provided, unless you choose otherwise{" "}
              <HiveLink href="https://about.x.com/en">here</HiveLink>.
            </p>
            <div className="h-14"></div>

            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit"
              className=" mt-auto py-5"
            >
              {form.formState.isSubmitting ? (
                <HiveLoading className="size-7 border-background border-t-transparent" />
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export type NeedPasswordFormProps = {
  className?: string;
};
