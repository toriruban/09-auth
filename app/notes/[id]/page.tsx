import { fetchNoteById } from '@/lib/api';
import type { Metadata } from 'next'
import NoteDetailsClient from './NoteDetails.client'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
type Props = {
    params: Promise<{ id: string }>
  }
  export async function generateMetadata({ params }: Props):Promise<Metadata> {
    const { id } = await params;
    const note = await(fetchNoteById(id))
    return {
      title: `Note: ${note.title}`,
      description: note.content,
      openGraph: {
        title: `Note: ${note.title}`,
        description: note.content,
        url:`https://08-zustand-opal.vercel.app/notes/${id}`,
        siteName: 'NoteHub',
        images: [{
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: note.title
        }],
        type: 'article',
      }
    }
  }
  const NoteDetails = async ({ params }: Props) => {
    const response = await params
    const noteId = Number(response.id);
    const queryClient = new QueryClient()
  
    queryClient.prefetchQuery({
      queryKey: ['note', noteId],
      queryFn: () => fetchNoteById(noteId),
    })
  
    return (
      <div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoteDetailsClient />
        </HydrationBoundary>
      </div>
    )
  }
  
  export default NoteDetails