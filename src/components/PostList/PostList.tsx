import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Post } from '../../types/post';
import css from './PostList.module.css';
import { deletePost } from '../../services/postService';

interface PostListProps {
  posts: Post[];
  toggleModal: () => void;
  toggleEditPost: (selectedPost: Post) => void;
}

export default function PostList({ posts, toggleModal, toggleEditPost }: PostListProps) {
  const queryClient = useQueryClient();

  const handleEditPost = (post: Post) => {
    toggleModal();
    toggleEditPost(post);
  };

  const { mutate } = useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Post was successfully deleted');
    },
  });

  return (
    <ul className={css.list}>
      {posts.map((post) => (
        <li key={post.id} className={css.listItem}>
          <h2 className={css.title}>{post.title}</h2>
          <p className={css.content}>{post.body}</p>
          <div className={css.footer}>
            <button onClick={() => handleEditPost(post)} className={css.edit}>
              Edit
            </button>
            <button onClick={() => mutate(post.id)} className={css.delete}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
