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
import { sendVerificationCode } from "~/lib/mail";
import { useState } from "react";
import { useToast } from "~/components/ui/use-toast";

export const SendVerificationForm = (
  props: SendVerificationFormProps
): JSX.Element => {
  const { className, email } = props;
  const [isResendingSuccess, setIsResendingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verificationCodeSchema>>({
    resolver: zodResolver(verificationCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verificationCodeSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
            <p className="">Enter it below to verify {email}</p>
            <div className="h-6"></div>
            <FormField
              control={form.control}
              name="code"
              render={({ field, fieldState }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      className={cn({
                        "border-[1.5px] border-destructive": fieldState.error,
                      })}
                      placeholder="Verification  code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute mt-1 pl-2 font-medium" />
                </FormItem>
              )}
            />
            <span
              onClick={async () => {
                setIsLoading(true);

                const res = await sendVerificationCode(email);
                if ((res?.accepted.length ?? 0) > 0) {
                  setIsLoading(false);
                  setIsResendingSuccess(true);
                  setTimeout(() => {
                    setIsResendingSuccess(false);
                  }, 3000);
                } else {
                  setIsLoading(false);
                  toast({
                    title: "Something went wrong",
                    description: "Email not sent. Please try again.",
                  });
                }
              }}
              className="flex cursor-pointer items-center gap-2 p-1 pl-3 text-sm font-medium text-secondary"
            >
              {"Didn't receive email?"}{" "}
              {isLoading ? (
                <HiveLoading />
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
              {form.formState.isSubmitting ? <HiveLoading /> : "Next"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export type SendVerificationFormProps = {
  className?: string;
  email: string;
};
