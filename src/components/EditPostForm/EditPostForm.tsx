import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from 'formik';

import css from './EditPostForm.module.css';
import type { Post } from '../../types/post';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editPost } from '../../services/postService';

interface EditPostFormProps {
  onClose: () => void;
  inititalValues: Post;
}

const EditPostSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  body: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .required('Content is required'),
});

export default function EditPostForm({ onClose, inititalValues }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (newDataPost: Post) => editPost(newDataPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
      alert('Post was successfully edited');
    },
  });

  const handleSubmit = (values: Post, actions: FormikHelpers<Post>) => {
    mutate(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={inititalValues}
      onSubmit={handleSubmit}
      validationSchema={EditPostSchema}
    >
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
