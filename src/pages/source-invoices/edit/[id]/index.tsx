import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getSourceInvoiceById, updateSourceInvoiceById } from 'apiSdk/source-invoices';
import { sourceInvoiceValidationSchema } from 'validationSchema/source-invoices';
import { SourceInvoiceInterface } from 'interfaces/source-invoice';
import { SourceInterface } from 'interfaces/source';
import { InvoiceInterface } from 'interfaces/invoice';
import { getSources } from 'apiSdk/sources';
import { getInvoices } from 'apiSdk/invoices';

function SourceInvoiceEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<SourceInvoiceInterface>(
    () => (id ? `/source-invoices/${id}` : null),
    () => getSourceInvoiceById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SourceInvoiceInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSourceInvoiceById(id, values);
      mutate(updated);
      resetForm();
      router.push('/source-invoices');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<SourceInvoiceInterface>({
    initialValues: data,
    validationSchema: sourceInvoiceValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Source Invoices',
              link: '/source-invoices',
            },
            {
              label: 'Update Source Invoice',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Source Invoice
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <AsyncSelect<SourceInterface>
            formik={formik}
            name={'source_id'}
            label={'Select Source'}
            placeholder={'Select Source'}
            fetcher={getSources}
            labelField={'name'}
          />
          <AsyncSelect<InvoiceInterface>
            formik={formik}
            name={'invoice_id'}
            label={'Select Invoice'}
            placeholder={'Select Invoice'}
            fetcher={getInvoices}
            labelField={'invoice_number'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/source-invoices')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'source_invoice',
    operation: AccessOperationEnum.UPDATE,
  }),
)(SourceInvoiceEditPage);
