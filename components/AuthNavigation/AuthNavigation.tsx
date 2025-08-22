"use client";
import { logout } from "@/lib/api/clientApi";
import { useAuth } from "@/lib/store/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";

const AuthNavigation = () => {
  const { isAuth, user, clearAuth } = useAuth();
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      await logout();
      clearAuth();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return isAuth ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Profile
        </Link>
      </li>
      <li className={css.navigationItem}>
        <p className={css.userEmail}>{user?.email}</p>
      </li>
      <li className={css.navigationItem}>
        <button onClick={handleLogOut} className={css.logoutButton}>
          Logout
        </button>
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;