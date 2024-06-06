"use client";
import { LoginForm } from "./_components/login-form";
import { PasswordForm } from "./_components/password-form";
import { useLoginStore } from "./store/login-store";

export default function Login() {
  const { nthForm } = useLoginStore();
  return (
    <>
      {nthForm === 0 && <LoginForm />}
      {nthForm === 1 && <PasswordForm />}
    </>
  );
}
