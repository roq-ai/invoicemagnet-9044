import { SourceInvoiceInterface } from 'interfaces/source-invoice';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SourceInterface {
  id?: string;
  name: string;
  type: string;
  url: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  source_invoice?: SourceInvoiceInterface[];
  user?: UserInterface;
  _count?: {
    source_invoice?: number;
  };
}

export interface SourceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  type?: string;
  url?: string;
  user_id?: string;
}
