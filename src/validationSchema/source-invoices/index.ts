import * as yup from 'yup';

export const sourceInvoiceValidationSchema = yup.object().shape({
  source_id: yup.string().nullable().required(),
  invoice_id: yup.string().nullable().required(),
});
