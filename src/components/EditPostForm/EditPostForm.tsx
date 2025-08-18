import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import css from './EditPostForm.module.css';
import { editPost } from '../../services/postService';
import type { Post } from '../../types/post';

interface EditPostFormProps {
  editedPost: Post;
  onClose: () => void;
}

const EditPostSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required('Title is required!'),
  body: Yup.string().max(500).required('Content is required!'),
});

export default function EditPostForm({ editedPost, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newDataPost: Post) => editPost(newDataPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Post changed successfully!');
      onClose();
    },
  });

  const handleEditPost = (values: Post, actions: FormikHelpers<Post>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik initialValues={editedPost} onSubmit={handleEditPost} validationSchema={EditPostSchema}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onClose} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
