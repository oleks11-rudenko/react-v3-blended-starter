'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { fetchPostById, fetchUserById } from '@/lib/api';
import { User } from '@/types/user';
import css from './PostDetails.module.css';

export default function PostDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const handleClickBack = () => router.back();

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
    <div className={css.container}>
      <div className={css.item}>
        <button onClick={handleClickBack} className={css.backBtn}>
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
      </div>
    </div>
  );
}
