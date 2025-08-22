import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type NewNoteData = {
    title: string,
    content: string,
    tag: string
}
export const initialDraft: NewNoteData = {
    title: '',
    content: '',
    tag: 'Todo',
}
type NoteDraftStore = {
    draft: NewNoteData,
    setDraft: (draft: Partial<NewNoteData>) => void;
    clearDraft: () => void
}
export const useNoteDraftStore = create<NoteDraftStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (update) => set((state) => ({draft:{...state.draft, ...update}})),
            clearDraft: () => set({draft:initialDraft}),
        }),
        {
            name: 'note-draft',
        }
    )
);
