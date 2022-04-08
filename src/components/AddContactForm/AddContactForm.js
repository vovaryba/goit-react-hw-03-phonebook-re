import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import s from './AddContactForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'At least 1 character')
    .lowercase()
    .trim()
    .required('Required'),
  number: Yup.number().positive().integer().required('Required'),
});

const addContactForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ name: '', number: '' }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      onSubmit(values);
      setSubmitting = false;
      resetForm({ values: '' });
    }}
  >
    <Form className={s.form} autoComplete="off">
      <label>
        Name
        <Field className={s.input} type="text" name="name" />
      </label>
      <div className={s.error}>
        <ErrorMessage name="name" />
      </div>

      <label>
        Number
        <Field className={s.input} type="tel" name="number" />
      </label>
      <div className={s.error}>
        <ErrorMessage className={s.error} name="number" />
      </div>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </Form>
  </Formik>
);

export default addContactForm;
