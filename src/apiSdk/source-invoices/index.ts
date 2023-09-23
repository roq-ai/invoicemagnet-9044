import axios from 'axios';
import queryString from 'query-string';
import { SourceInvoiceInterface, SourceInvoiceGetQueryInterface } from 'interfaces/source-invoice';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSourceInvoices = async (
  query?: SourceInvoiceGetQueryInterface,
): Promise<PaginatedInterface<SourceInvoiceInterface>> => {
  const response = await axios.get('/api/source-invoices', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSourceInvoice = async (sourceInvoice: SourceInvoiceInterface) => {
  const response = await axios.post('/api/source-invoices', sourceInvoice);
  return response.data;
};

export const updateSourceInvoiceById = async (id: string, sourceInvoice: SourceInvoiceInterface) => {
  const response = await axios.put(`/api/source-invoices/${id}`, sourceInvoice);
  return response.data;
};

export const getSourceInvoiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/source-invoices/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSourceInvoiceById = async (id: string) => {
  const response = await axios.delete(`/api/source-invoices/${id}`);
  return response.data;
};
