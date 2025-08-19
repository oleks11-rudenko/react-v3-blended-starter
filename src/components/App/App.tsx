import { keepPreviousData, useQuery } from '@tanstack/react-query';
import PostList from '../PostList/PostList';
import SearchBox from '../SearchBox/SearchBox';

import css from './App.module.css';
import { fetchPosts } from '../../services/postService';
import { useState } from 'react';
import type { Post } from '../../types/post';
import Pagination from '../Pagination/Pagination';
import { useDebouncedCallback } from 'use-debounce';
import PostForm from '../CreatePostForm/CreatePostForm';
import Modal from '../Modal/Modal';
import EditPostForm from '../EditPostForm/EditPostForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<null | Post>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isSuccess } = useQuery({
    queryKey: ['posts', searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPosts ? Math.ceil(data.totalPosts / 8) : 1;

  const resetPage = () => {
    setCurrentPage(1);
  };

  const editModal = () => {
    setIsModalOpen(true);
    setIsEditPost(true);
  };

  const createModal = () => {
    setIsModalOpen(true);
    setIsCreatePost(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditPost(false);
    setIsCreatePost(false);
    setEditedPost(null);
  };

  const debouncedSearchQuery = useDebouncedCallback(setSearchQuery, 300);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={debouncedSearchQuery} resetPage={resetPage} />
        {totalPages > 1 && isSuccess && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button onClick={createModal} className={css.button}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {isCreatePost && <PostForm onClose={closeModal} />}
          {isEditPost && editedPost && (
            <EditPostForm onClose={closeModal} inititalValues={editedPost} />
          )}
        </Modal>
      )}
      {data?.posts && (
        <PostList posts={data?.posts} toggleModal={editModal} toggleEditPost={setEditedPost} />
      )}
    </div>
  );
}
