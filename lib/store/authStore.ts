"use client";
import { create } from "zustand";
import type { User } from "@/types/user";

type AuthState = {
  isAuth: boolean;
  user: User | null;
  setAuth: (user: User) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
};

export const useAuth = create<AuthState>((set) => ({
  isAuth: false,
  user: null,
  setAuth: (user) => set({ isAuth: true, user }),
  clearAuth: () => set({ isAuth: false, user: null }),
  setUser: (user) => set({ user }),
}));