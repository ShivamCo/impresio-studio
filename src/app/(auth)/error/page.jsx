"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  const message = {
    OAuthAccountNotLinked:
      "Account already linked to another login method. Use the original provider.",
    default: "Something went wrong during sign-in. Please try again.",
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Authentication Error</h1>
      <p>{message[error] || message.default}</p>
    </div>
  );
}
