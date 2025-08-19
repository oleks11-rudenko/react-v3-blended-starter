import * as Yup from 'yup';
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';

import css from './CreatePostForm.module.css';
import type { NewPost } from '../../types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/postService';

interface PostFormProps {
  onClose: () => void;
}

const initialValues: NewPost = {
  title: '',
  body: '',
};

const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  body: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .required('Content is required'),
});

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
      alert('Post was successfully created');
    },
  });

  const handleSubmit = (values: NewPost, actions: FormikHelpers<NewPost>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
