"use client";
import { SessionProvider } from "next-auth/react";

const Provider = ({ childre, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
