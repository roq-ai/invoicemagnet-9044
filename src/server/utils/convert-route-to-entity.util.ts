const mapping: Record<string, string> = {
  companies: 'company',
  invoices: 'invoice',
  'invoice-items': 'invoice_item',
  sources: 'source',
  'source-invoices': 'source_invoice',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
