import * as Yup from 'yup';
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../../services/postService';
import css from './CreatePostForm.module.css';
import type { NewPost } from '../../types/post';

interface PostFormProps {
  onClose: () => void;
}

interface PostFormValues {
  title: string;
  body: string;
}

const initialValues: PostFormValues = {
  title: '',
  body: '',
};

const PostSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required('Title is required!'),
  body: Yup.string().max(500).required('Content is required!'),
});

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newPost: NewPost) => createPost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Post created successfully!');
      onClose();
    },
  });

  const handleSubmit = (values: PostFormValues, actions: FormikHelpers<PostFormValues>) => {
    mutate({
      title: values.title,
      body: values.body,
    });
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
