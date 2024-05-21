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
import { verificationCodeSchema } from "~/app/schemas/sign-up-schema";
import { DialogClose, DialogTitle } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import { HiveLoading } from "~/components/hive/hive-loading";
import { Button } from "~/components/ui/button";
import { ArrowLeftIcon, CheckIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { useSignupStore } from "../store/signup-store";

export const SendVerificationForm = (): JSX.Element => {
  const { email, nextForm } = useSignupStore();
  const [isResendingSuccess, setIsResendingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSentOnce, setIsSentOnce] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const verifyAccountByCode = api.user.verifyAccountByCode.useMutation();
  const sendVerificationCode = api.user.sendVerificationCode.useMutation();

  const handleResend = async () => {
    setIsSentOnce;
    setIsLoading(true);
    const emailRecepient = await sendVerificationCode.mutateAsync({
      email,
    });
    if (emailRecepient !== undefined) {
      setIsLoading(false);
      setIsResendingSuccess(true);
      setTimeout(() => {
        setIsResendingSuccess(false);
      }, 3000);

      if (!isSentOnce) {
        setIsSentOnce(true);
      }
    } else {
      setIsLoading(false);
      toast({
        title: "Something went wrong",
        description: "Verification code not sent. Please try again.",
      });
    }
  };

  const onSubmit = async (values: z.infer<typeof verificationCodeSchema>) => {
    try {
      const res = await verifyAccountByCode.mutateAsync({
        email,
        code: values.code,
      });
      if (res.isVerified) {
        nextForm();
      } else {
        form.setError("code", { message: "Invalid code" });
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleResend();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Form {...form}>
      <form className="size-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex size-full max-h-full flex-col">
          <DialogClose className="absolute left-5 top-5">
            <ArrowLeftIcon className="size-5" />
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
              We sent you a code
            </DialogTitle>
            <p className="py-1 text-muted-foreground">
              Enter it below to verify {email}
            </p>
            <div className="min-h-6"></div>
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <FormItem className="relative space-y-0">
                  <FormMessage className="absolute -bottom-6 -right-0 mt-1 pl-2 font-medium" />
                  <FormControl>
                    <Input
                      className={cn({
                        "border-destructive": fieldState.error,
                      })}
                      placeholder="Verification code"
                      {...field}
                      onFocus={() => form.clearErrors("code")}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span
              onClick={handleResend}
              className="flex cursor-pointer items-center gap-2 p-1 pl-3 text-sm font-medium text-secondary"
            >
              {"Didn't receive email?"}{" "}
              {isSentOnce && isLoading ? (
                <HiveLoading className="size-4" />
              ) : isResendingSuccess ? (
                <CheckIcon height={16} color="lightgreen" />
              ) : null}
            </span>

            <div className="h-full"></div>

            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit"
              className="mt-auto py-5"
            >
              {form.formState.isSubmitting ? (
                <HiveLoading className="size-7 border-background border-t-transparent" />
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export type SendVerificationFormProps = {
  className?: string;
};
