import { InvoiceItemInterface } from 'interfaces/invoice-item';
import { SourceInvoiceInterface } from 'interfaces/source-invoice';
import { CompanyInterface } from 'interfaces/company';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface InvoiceInterface {
  id?: string;
  invoice_number: string;
  date: any;
  total_amount: number;
  status: string;
  due_date?: any;
  company_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  invoice_item?: InvoiceItemInterface[];
  source_invoice?: SourceInvoiceInterface[];
  company?: CompanyInterface;
  user?: UserInterface;
  _count?: {
    invoice_item?: number;
    source_invoice?: number;
  };
}

export interface InvoiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  invoice_number?: string;
  status?: string;
  company_id?: string;
  user_id?: string;
}
