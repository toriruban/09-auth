"use client";
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api/clientApi';
import { FetchNotesResponse } from '@/lib/api/api'; 
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesClient.module.css';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';

type NotesClientProps = {
  initialData: FetchNotesResponse;
  tag: string; 
}

const NotesClient = ({ initialData, tag }: NotesClientProps) => {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page, tag],
    queryFn: () => fetchNotes({search: debouncedSearch, page, tag}),
    placeholderData: keepPreviousData,
    initialData,
  });
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Link href='/notes/action/create' className={css.button} >
          Create note +
        </Link>
      </header>
      {data?.notes && data.notes.length > 0 && (
        <NoteList 
        notes={data.notes} 
        />
      )}
    </div>
  );
}

export default NotesClient;