import { InvoiceInterface } from 'interfaces/invoice';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceItemInterface {
  id?: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
  invoice_id: string;
  created_at?: any;
  updated_at?: any;

  invoice?: InvoiceInterface;
  _count?: {};
}

export interface InvoiceItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  invoice_id?: string;
}
