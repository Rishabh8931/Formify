import { Suspense } from "react";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignUp />
    </Suspense>
  );
}