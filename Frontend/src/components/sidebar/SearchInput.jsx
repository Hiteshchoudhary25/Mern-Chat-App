import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import { useGetConversations } from '../../hooks/useGetConversations';
import { toast } from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedSearch = search.trim(); // Trim whitespace from search input
    if (!trimmedSearch) return;
    if (trimmedSearch.length < 3) {
      return toast.error("Search must be at least 3 characters long");
    }

    // Find conversation that includes the search term in a case-insensitive way
    const conversation = conversations?.find((c) =>
      c.fullName.toLowerCase().includes(trimmedSearch.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error(`No user found matching "${trimmedSearch}"`);
      setSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        placeholder='Search...'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};

export default SearchInput;
