import { SourceInterface } from 'interfaces/source';
import { InvoiceInterface } from 'interfaces/invoice';
import { GetQueryInterface } from 'interfaces';

export interface SourceInvoiceInterface {
  id?: string;
  source_id: string;
  invoice_id: string;
  created_at?: any;
  updated_at?: any;

  source?: SourceInterface;
  invoice?: InvoiceInterface;
  _count?: {};
}

export interface SourceInvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  source_id?: string;
  invoice_id?: string;
}
