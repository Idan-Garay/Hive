"use client";
import { CreateAccountForm } from "./_components/create-account-form";
import { SendVerificationForm } from "./_components/send-verification-form";

export default function SignupPage() {
  return (
    <>
      {/* <CreateAccountForm /> */}
      <SendVerificationForm email="garayidan@gmail.com" />
    </>
  );
}
