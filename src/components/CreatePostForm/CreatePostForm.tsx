import * as Yup from 'yup';
import { Field, Form, Formik, type FormikHelpers, ErrorMessage } from 'formik';

import css from './CreatePostForm.module.css';

export default function PostForm() {
  return (
    <Formik initialValues={} onSubmit={} validationSchema={}>
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
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
