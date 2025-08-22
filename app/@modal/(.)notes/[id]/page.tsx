import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from "@tanstack/react-query";
  import { fetchNoteById } from "@/lib/api/serverApi";
  import NotePreviewClient from "@/app/@modal/(.)notes/[id]/NotePreview.client";
  
  type Props = { params: { id: string } };
  
  const NoteDetails = async ({ params }: Props) => {
    const { id } = params;
    if (!id) {
      throw new Error("Invalid note ID");
    }
  
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient id={id}/>
      </HydrationBoundary>
    );
  };
  
  export default NoteDetails;