import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { loginFormSchema } from "~/app/schemas/sign-up-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { useLoginStore } from "../store/login-store";
import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { HiveLoading } from "~/components/hive/hive-loading";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { HiveLink } from "~/components/hive/hive-link";
import { api } from "~/trpc/react";
import { HiveOverlay } from "~/components/hive/hive-overlay";
import { useToast } from "~/components/ui/use-toast";

export const LoginForm = () => {
  const { nextForm } = useLoginStore();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isLoading, refetch } = api.user.getAccountEmail.useQuery(
    form.getValues().email,
    {
      enabled: false,
    }
  );

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    try {
      const doesEmailExist = (await refetch()).data;

      if (!doesEmailExist) {
        toast({
          title: "Email doesn't exist.",
        });
        return null;
      }
      nextForm();
    } catch (error) {
      console.error(error, "er2");
    }
  };
  return (
    <Form {...form}>
      <form
        className="mx-auto h-full w-3/4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {form.formState.isSubmitting ? (
          <HiveOverlay>
            <HiveLoading />
          </HiveOverlay>
        ) : null}
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
            <DialogTitle className="py-8 text-3xl font-bold">
              Sign in to Hive
            </DialogTitle>
            <Button className="font-normal lg:max-w-[356px]">
              <Image
                src="/google-icon.svg"
                alt="google-icon"
                height={24}
                width={24}
                className="mr-2"
              />
              Sign in with Google
            </Button>
            <div className="h-6"></div>
            <Button className="font-semibold lg:max-w-[356px]">
              <Image
                src="/github-icon.svg"
                alt="apple-icon"
                height={24}
                width={24}
                className="mr-2"
              />
              Sign in with Github
            </Button>
            <div className="relative h-[40px] w-[300px]">
              <hr className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-foreground/30 " />
              <p className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground px-2 text-primary">
                or
              </p>
            </div>

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
            <div className="h-8" />
            <Button
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              type="submit"
              className="font-semibold"
            >
              {form.formState.isSubmitting ? <HiveLoading /> : "Next"}
            </Button>
            <div className="h-6" />
            <Button variant="outline" type="submit" className="font-semibold">
              Forgot Password?
            </Button>
            <div className="h-12" />
            <span className="block text-muted-foreground">
              Don&apos;t have an account?{" "}
              <HiveLink href="/sign-up">Sign up</HiveLink>
            </span>
          </div>
        </div>
      </form>
    </Form>
  );
};
