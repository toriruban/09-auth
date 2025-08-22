"use client";
import { useEffect } from "react";
import { useAuth } from "@/lib/store/authStore";
import { checkSession, getMe } from "@/lib/api/clientApi";

const AUTH_KEY = "notehub:auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, clearAuth } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const ok = await checkSession();      
        if (!ok) {
          if (!cancelled) clearAuth();
          return;
        }
        const me = await getMe();             
        if (!cancelled) setAuth(me);
      } catch {
        if (!cancelled) clearAuth();
      }
    };

    init();

    const onStorage = (e: StorageEvent) => {
      if (e.key === AUTH_KEY && e.newValue === "logout") clearAuth();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
    };
  }, [setAuth, clearAuth]);

  return <>{children}</>;
}