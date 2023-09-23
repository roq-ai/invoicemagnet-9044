import axios from 'axios';
import queryString from 'query-string';
import { InvoiceItemInterface, InvoiceItemGetQueryInterface } from 'interfaces/invoice-item';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getInvoiceItems = async (
  query?: InvoiceItemGetQueryInterface,
): Promise<PaginatedInterface<InvoiceItemInterface>> => {
  const response = await axios.get('/api/invoice-items', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createInvoiceItem = async (invoiceItem: InvoiceItemInterface) => {
  const response = await axios.post('/api/invoice-items', invoiceItem);
  return response.data;
};

export const updateInvoiceItemById = async (id: string, invoiceItem: InvoiceItemInterface) => {
  const response = await axios.put(`/api/invoice-items/${id}`, invoiceItem);
  return response.data;
};

export const getInvoiceItemById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/invoice-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteInvoiceItemById = async (id: string) => {
  const response = await axios.delete(`/api/invoice-items/${id}`);
  return response.data;
};
