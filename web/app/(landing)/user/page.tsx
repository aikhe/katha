"use client";

import { useEffect, useState, useTransition } from "react";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";

import { createBrowser } from "@/lib/supabase/client";

const UserPage = () => {
  const supabase = createBrowser();

  const [signOutPending, startSignOut] = useTransition();
  const [user, setUser] = useState<User>();

  const signOut = () => {
    startSignOut(async () => {
      await supabase.auth.signOut();
      redirect("/sign-up");
    });
  };

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/sign-un");
    }
    setUser(data?.user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main>
      <h1>{user?.email}</h1>
      <form action={signOut}>
        <button type="submit">
          {signOutPending ? "Signing out..." : "Sign out"}
        </button>
      </form>
    </main>
  );
};

export default UserPage;
