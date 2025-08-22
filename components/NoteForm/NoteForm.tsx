"use client";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { createNote } from '../../lib/api';
import { useRouter } from 'next/navigation';
import { NoteTag } from '../../types/note';
import { useNoteDraftStore } from '@/lib/store/noteStore'
import css from './NoteForm.module.css';

export default function NoteForm() {
  const draft = useNoteDraftStore((state)=> state.draft);
  const setDraft = useNoteDraftStore((state) => state.setDraft);
  const clearDraft = useNoteDraftStore((state) => state.clearDraft);

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      clearDraft();
      router.push('/notes/filter/All')
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setDraft({[name]: value})
  }

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as {
     title: string,
     content: string,
     tag: NoteTag
    };
    mutation.mutate(values)
  }

  return (
    <form action={handleSubmit} className={css.form}>
    <div className={css.formGroup}>
         <label htmlFor="title">Title</label>
         <input id="title" 
                name="title" 
                type="text" 
                className={css.input} 
                required 
                minLength={3} 
                maxLength={50}
                onChange={handleChange}
                value={draft.title}
                />
      </div>

    <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            maxLength={500}
            className={css.textarea}
            onChange={handleChange}
            value={draft.content}
          />
    </div>

    <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select id="tag" 
                  name="tag" 
                  className={css.select} 
                  required
                  onChange={handleChange}
                  value={draft.tag}
          >
            <option value="">Choose tag</option>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>

        <div className={css.actions}>
          <button 
                type="button" 
                className={css.cancelButton} 
                onClick={() => router.back()}
                >
            Cancel
          </button>
          <button type="submit" 
                  className={css.submitButton} >
            Create note
          </button>
        </div>
</form>
);
}