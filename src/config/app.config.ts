interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Account Manager'],
  tenantName: 'Company',
  applicationName: 'InvoiceMagnet',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage company information', 'Manage invoices and their items', 'Manage sources', 'Manage users'],
  getQuoteUrl: 'https://app.roq.ai/proposal/765dc369-f1b6-4445-b7d9-561036207535',
};
