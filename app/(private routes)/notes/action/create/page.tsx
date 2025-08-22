import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';

export const metadata = {
    title: 'CreateNote | NoteHub',
    description: 'Create a new note and save your ideas in NoteHub.',
    openGraph: {
        title: 'CreateNote | NoteHub',
        description: 'Create a new note and save your ideas in NoteHub.',
        url: 'https://08-zustand-opal.vercel.app/notes/action/create',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'Create Note - NoteHub'
    }]
    }
}
const CreateNote = () => {
   return(
    <main className={css.main}>
        <div className={css.container}>
          <h1 className={css.title}>Create note</h1>
	      <NoteForm />
        </div>
    </main>
    )
}

export default CreateNote;