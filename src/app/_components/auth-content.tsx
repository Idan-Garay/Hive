import { Button } from "~/components/ui/button";
import { HiveLink } from "~/components/hive/hive-link";
import Image from "next/image";

export const AuthContent = () => {
  return (
    <div className="flex w-full flex-col lg:justify-center">
      <div className="py-16 ">
        <h1 className="text-6xl font-extrabold leading-normal tracking-wide">
          Happening now
        </h1>
      </div>
      <div className="pb-12">
        <h3 className="text-4xl font-extrabold">Join Today.</h3>
      </div>
      <Button className="font-normal lg:max-w-[356px]">
        <Image
          src="/google-icon.svg"
          alt="google-icon"
          height={24}
          width={24}
          className="mr-2"
        />
        Sign up with Google
      </Button>
      <div className="h-4"></div>
      <Button className="font-semibold lg:max-w-[356px]">
        <Image
          src="/github-icon.svg"
          alt="apple-icon"
          height={24}
          width={24}
          className="mr-2"
        />
        Sign up with Github
      </Button>
      <div className="relative h-[40px] w-[300px] ">
        <hr className="absolute left-1/2 top-1/2 z-0 w-full -translate-x-1/2 -translate-y-1/2 border-foreground/30 " />
        <p className=" absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-primary-foreground px-2 text-primary">
          or
        </p>
      </div>
      <Button
        variant="secondary"
        className="mb-2 font-semibold lg:max-w-[356px]"
      >
        Create Account
      </Button>
      <p className="w-[300px] text-xs text-muted-foreground">
        By signing up, you agree to the{" "}
        <HiveLink href="https://twitter.com/tos">Terms of Service</HiveLink> and{" "}
        <HiveLink href="https://twitter.com/privacy">Privacy Policy</HiveLink>,
        including{" "}
        <HiveLink href="https://help.twitter.com/rules-and-policies/twitter-cookies">
          Cookie Use
        </HiveLink>
        .
      </p>

      <div className="flex flex-col gap-y-4 pt-8 lg:max-w-[356px]">
        <span className="block text-lg font-bold">
          Already have an account?
        </span>
        <HiveLink
          prefetch={false}
          shallow={true}
          variant="button"
          href="/login"
        >
          Sign in
        </HiveLink>
      </div>
    </div>
  );
};
