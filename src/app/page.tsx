import Image from "next/image";
import { AuthContent, Footer } from "./_components";
import { AuthDialog } from "./_components/auth-dialog";

export default function Index() {
  return (
    <>
      <AuthDialog />

      <div className="flex min-h-screen flex-col items-center justify-start lg:justify-evenly">
        <main className="flex h-5/6 w-[568px] max-w-full flex-wrap bg-background p-8 text-accent-foreground lg:h-auto lg:w-screen lg:flex-nowrap">
          <div className=" flex max-h-14 min-h-[48px] w-full items-center justify-start lg:max-h-full lg:justify-center">
            <div className="relative h-full max-h-[444px] w-8 lg:w-full">
              <Image src="/x-icon.svg" alt="x-icon" fill />
            </div>
          </div>
          <div className="w-full">
            <AuthContent />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
