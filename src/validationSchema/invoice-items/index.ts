import * as yup from 'yup';

export const invoiceItemValidationSchema = yup.object().shape({
  description: yup.string().required(),
  quantity: yup.number().integer().required(),
  price: yup.number().integer().required(),
  total: yup.number().integer().required(),
  invoice_id: yup.string().nullable().required(),
});
