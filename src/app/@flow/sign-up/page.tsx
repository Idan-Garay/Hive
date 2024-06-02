"use client";
import { motion, AnimatePresence } from "framer-motion";
import { CreateAccountForm } from "./_components/create-account-form";
import { SendVerificationForm } from "./_components/send-verification-form";
import { NeedPasswordForm } from "./_components/need-password-form";
import { useSignupStore } from "./store/signup-store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
// import { PickProfileForm } from "./_components/pick-profile-form";

export default function SignupPage() {
  const { nthForm, isFormComplete } = useSignupStore();
  const router = useRouter();
  const variants = {
    enter: {
      x: 50,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: -50,
      opacity: 0,
    },
  };

  useEffect(() => {
    if (isFormComplete) {
      router.replace("/");
    }
  }, [isFormComplete]);

  return (
    <>
      <AnimatePresence>
        {nthForm === 0 && (
          <motion.div
            className="min-w-full "
            key="form-1"
            variants={variants}
            animate="center"
            transition={{ duration: 0.2, ease: "easeInOut" }}
            exit="exit"
          >
            <CreateAccountForm />
          </motion.div>
        )}
        {nthForm === 1 && (
          <motion.div
            className="min-w-full "
            key="form-2"
            variants={variants}
            animate="center"
            exit="exit"
          >
            <SendVerificationForm />
          </motion.div>
        )}
        {nthForm === 2 && (
          <motion.div
            className="min-w-full "
            key="form-3"
            variants={variants}
            animate="center"
            exit="exit"
          >
            <NeedPasswordForm />
          </motion.div>
        )}
        {/* {nthForm === 3 && (
          <motion.div
            key="form-4"
            className="min-w-full "
            variants={variants}
            animate="center"
            exit="exit"
          >
            <PickProfileForm />
          </motion.div>
        )} */}
      </AnimatePresence>
    </>
  );
}
