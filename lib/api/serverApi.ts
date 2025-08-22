import { cookies } from "next/headers";
import { nextServer as api } from "./api";
import type { ServerBoolResponse } from "./clientApi";
import type { FetchNotesResponse, FetchNotesParams, Note } from "@/types/note";
import type { User } from "@/types/user";

export const fetchNotes = async (
  { search = "", page = 1, perPage = 12, tag = "" }: FetchNotesParams = {}
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();

  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
      page,
      perPage,
    },
    headers: { cookie: cookieStore.toString() },
  });

  return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${noteId}`, {
    headers: { cookie: cookieStore.toString() },
  });

  return data;
};
export const checkServerSession = async () => {
  const cookieStore = await cookies();

  const response = await api.get<ServerBoolResponse>("/auth/session", {
    headers: { cookie: cookieStore.toString() },
  });

  return response;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: { cookie: cookieStore.toString() },
  });

  return data;
};