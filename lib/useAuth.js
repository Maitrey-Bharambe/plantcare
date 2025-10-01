// lib/useAuth.js
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      } else {
        router.push("/auth"); // redirect to login page
      }
      setLoading(false);
    };

    checkUser();

    // Listen to auth changes (logout or login from another tab)
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session?.user) router.push("/auth");
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return { user, loading };
}
