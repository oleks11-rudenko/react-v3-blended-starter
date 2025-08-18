import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import css from './EditPostForm.module.css';

export default function EditPostForm() {
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
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={}>
            Edit post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
