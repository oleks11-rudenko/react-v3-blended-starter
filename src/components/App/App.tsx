import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';
import { fetchPosts } from '../../services/postService';
import css from './App.module.css';
import Modal from '../Modal/Modal';
import PostList from '../PostList/PostList';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import PostForm from '../CreatePostForm/CreatePostForm';
import type { Post } from '../../types/post';
import EditPostForm from '../EditPostForm/EditPostForm';

const LIMIT = 8;

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [isEditPost, setiIsEditPost] = useState(false);
  const [editedPost, setEditedPost] = useState<Post | null>(null);

  const debouncedSearchQuery = useDebouncedCallback(setSearchQuery, 300);

  const resetPage = () => setCurrentPage(1);

  const openModal = () => {
    setIsModalOpen(true);
    setIsCreatePost(true);
  };

  const editPostModal = () => {
    setIsModalOpen(true);
    setiIsEditPost(true);
  };

  const closeModal = () => {
    setEditedPost(null);
    setIsModalOpen(false);
    setiIsEditPost(false);
    setIsCreatePost(false);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ['posts', searchQuery, currentPage],
    queryFn: () => fetchPosts(searchQuery, currentPage, LIMIT),
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPosts ? Math.ceil(data.totalPosts / LIMIT) : 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={debouncedSearchQuery}
          resetPage={resetPage}
        />
        {isSuccess && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
        <button onClick={openModal} className={css.button}>
          Create post
        </button>
      </header>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {isCreatePost && <PostForm onClose={closeModal} />}
          {isEditPost && editedPost && (
            <EditPostForm onClose={closeModal} editedPost={editedPost} />
          )}
        </Modal>
      )}

      {data && data?.posts.length > 0 && (
        <PostList posts={data.posts} toggleModal={editPostModal} toggleEditPost={setEditedPost} />
      )}
    </div>
  );
}
