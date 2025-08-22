import { fetchNoteById } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string }>;
};
const NotePreviewPage = async ({ params } : Props) => {
    const { id } = await params;
    const noteId = Number(id);
    const queryClient = new QueryClient();
    queryClient.prefetchQuery({
        queryKey: ['note', noteId],
        queryFn: () => fetchNoteById(noteId),
    })
    return(
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreviewClient id={noteId}/>
        </HydrationBoundary>
    )}
export default NotePreviewPage;
