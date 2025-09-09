'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, fetchUserById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import { User } from '@/types/user';
import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClose = () => router.back();

  const [user, setUser] = useState<null | User>(null);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
    refetchOnMount: false,
  });

  useEffect(() => {
    if (!post) return;
    const getUser = async () => {
      const response = await fetchUserById(Number(post.userId));
      setUser(response);
    };
    getUser();
  }, [post]);

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !post) return <p>Something went wrong.</p>;

  return (
    <Modal onClose={handleClose}>
      <button onClick={handleClose} className={css.backBtn}>
        ← Back
      </button>
      {post ? (
        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{post.title}</h2>
            </div>

            <p className={css.content}>{post.body}</p>
          </div>
          {user && <p className={css.user}>Author: {user.name}</p>}
        </div>
      ) : (
        <p>No user data</p>
      )}
    </Modal>
  );
}
