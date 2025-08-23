import NotesClient from './Notes.client';
import { fetchNotes } from '../../../../../lib/api/serverApi';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';

export async function generateMetadata({ params }: NotesProps): Promise<Metadata> {
    const { slug } = await params;
    const isAll = slug[0] === 'All' || slug.length === 0;
    const tag = isAll ? 'All notes' : slug.join('/');
    const pageTitle = isAll ? 'All notes | NoteHub' : `${tag} | NoteHub`;
    const pageDescription = isAll ? 'View all notes' : `View notes filtered by: ${tag}`;
    const filterUrl = `https://09-auth-drab.vercel.app/notes/filter/${slug.join(`/`)}`
    
    return {
        title: pageTitle,
        description: pageDescription,
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: filterUrl,
            images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub'
            }
        ]}
    }
}

type NotesProps = {
    params: Promise<{ slug: string[] }>
}
const Notes = async({ params }: NotesProps) => {
    const { slug } = await params;
    const queryClient = new QueryClient();
    const tag = slug[0] === 'All' ? '' : slug[0];
    const response = await fetchNotes({ search: '', page: 1 , tag});
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient initialData={ response } tag={ tag }/>
        </HydrationBoundary>
    )
}
export default Notes;