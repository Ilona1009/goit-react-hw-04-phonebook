import PropTypes from 'prop-types';
import { Formik } from 'formik';

import {
  ButtonAddContactStyled,
  FormStyled,
  InputStyled,
  LabelStyled,
} from './ContactFormStyled';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';

export const ContactForm = ({ onSubmit }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    number: Yup.string()
      .matches(
        /^\d{3}-\d{2}-\d{2}$/,
        'Phone number must be in the format "000-00-00"'
      )
      .required('Number is required'),
  });

  const formatPhoneNumber = value => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 6) {
      return phoneNumber.replace(/(\d{3})(\d{0,2})/, '$1-$2');
    } else {
      return phoneNumber.replace(/(\d{3})(\d{2})(\d{0,2})/, '$1-$2-$3');
    }
  };

  const handlePhoneChange = (e, setFieldValue) => {
    const { value } = e.target;
    const formattedValue = formatPhoneNumber(value);
    setFieldValue('number', formattedValue);
  };

  const handleSubmit = (values, { resetForm }) => {
    onSubmit({ ...values, id: nanoid() });
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{
          name: '',
          number: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <FormStyled>
            <LabelStyled>name</LabelStyled>
            <InputStyled type="text" name="name" id="name" />

            <LabelStyled>number</LabelStyled>
            <InputStyled
              onChange={e => handlePhoneChange(e, setFieldValue)}
              type="text"
              id="number"
              name="number"
              value={values.number}
            />

            <ButtonAddContactStyled type="submit">
              Submit
            </ButtonAddContactStyled>
          </FormStyled>
        )}
      </Formik>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
