import * as yup from 'yup';

export const sourceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  url: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
