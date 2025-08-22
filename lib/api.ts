import axios from 'axios';
import { Note, NoteTag } from '../types/note';
const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}
type FetchNotesParams = {
  search?: string;
  page?: number;
  tag?: string;
};
export const fetchNotes = async (
  { search, page, tag }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const params: { search?: string; page?: number; tag?: string } = {};
  if (search) params.search = search;
  if (page) params.page = page;
  if (tag) params.tag = tag;

  const { data } = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params,
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return {
    notes:      data.notes      ?? [],
    totalPages: data.totalPages ?? 1,
  };
};
export interface CreateNote {
  title: string;
  content?: string;
  tag: NoteTag;
}

export const createNote = async (
  newNote: CreateNote
): Promise<Note> => {
  const { data } = await axios.post<Note>(
    `${BASE_URL}/notes`,
    newNote,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return data;
};

export const deleteNote = async (
  noteId: number
): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `${BASE_URL}/notes/${noteId}`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return data;
};

export const fetchNoteById = async (id: string | number) => {
  const { data } = await axios.get<Note>(`${BASE_URL}/notes/${id}`,{
    headers: { Authorization: `Bearer ${API_TOKEN}` },
  })
  return data;
}