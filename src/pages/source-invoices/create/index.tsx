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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSourceInvoice } from 'apiSdk/source-invoices';
import { sourceInvoiceValidationSchema } from 'validationSchema/source-invoices';
import { SourceInterface } from 'interfaces/source';
import { InvoiceInterface } from 'interfaces/invoice';
import { getSources } from 'apiSdk/sources';
import { getInvoices } from 'apiSdk/invoices';
import { SourceInvoiceInterface } from 'interfaces/source-invoice';

function SourceInvoiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SourceInvoiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSourceInvoice(values);
      resetForm();
      router.push('/source-invoices');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SourceInvoiceInterface>({
    initialValues: {
      source_id: (router.query.source_id as string) ?? null,
      invoice_id: (router.query.invoice_id as string) ?? null,
    },
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
              label: 'Create Source Invoice',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Source Invoice
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
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
    operation: AccessOperationEnum.CREATE,
  }),
)(SourceInvoiceCreatePage);
