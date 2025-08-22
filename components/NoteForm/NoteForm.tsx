"use client";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, CreateNoteRequest } from "@/lib/api/clientApi";
import { useState } from "react";
import { useNoteDraft } from "@/lib/store/noteDraftStore";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteDraft();
  const [formState, setFormState] = useState<CreateNoteRequest>({
    title: draft.title || "",
    content: draft.content || "",
    tag: draft.tag || "", 
  });

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      router.back();
    },
    onError: (err) => {
      console.error("Error creating note:", err);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updated: CreateNoteRequest = { ...formState, [name]: value };
    setFormState(updated);
    setDraft(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formState);
  };

  const handleCancel = () => router.back();

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formState.title}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          value={formState.content}
          onChange={handleChange}
          className={styles.textarea}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          value={formState.tag}
          onChange={handleChange}
          className={styles.select}
          required
        >
          <option value="" disabled>
            Select a tag
          </option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>

      {mutation.isError && (
        <p className={styles.error}>Failed to create note. Try again.</p>
      )}

      <div className={styles.actions}>
        <button type="button" onClick={handleCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={styles.submitButton}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}