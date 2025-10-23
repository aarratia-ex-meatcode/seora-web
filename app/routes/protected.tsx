"use client";

import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router";

export default function ProtectedLayout() {
  // const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;

  //   const stored = localStorage.getItem("auth");
  //   const parsed = stored ? JSON.parse(stored) : null;
  //   const token = parsed?.state?.token;

  //   if (!token) {
  //     window.location.href = "/";
  //   } else {
  //     setChecked(true);
  //   }
  // }, []);

  // if (!checked) {
  //   return (
  //     <div className="bg-background flex h-screen items-center justify-center">
  //       <Loader2 className="text-primary h-10 w-10 animate-spin" />
  //     </div>
  //   );
  // }

  return <Outlet />;
}
