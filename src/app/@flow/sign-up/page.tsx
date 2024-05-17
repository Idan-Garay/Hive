"use client";
import { useState } from "react";
// import { CreateAccountForm } from "./_components/create-account-form";
import { NeedPasswordForm } from "./_components/need-password-form";
import { SendVerificationForm } from "./_components/send-verification-form";

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const nextForm = () => setStep((step) => step + 1);

  return (
    <>
      {/* <CreateAccountForm /> */}
      {step === 1 && (
        <SendVerificationForm nextForm={nextForm} email="garayidan@gmail.com" />
      )}
      {step === 2 && <NeedPasswordForm email="garayidan@gmail.com" />}
    </>
  );
}
