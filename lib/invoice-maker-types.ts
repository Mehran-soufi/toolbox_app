export type InvoiceItem = {
  id: string;
  title: string;
  quantity: number;
  unitPrice: number;
  discount: number;
};

export type InvoiceData = {
  invoiceNumber: string;
  date: string;

  sellerName: string;
  sellerPhone: string;
  sellerAddress: string;

  customerName: string;
  customerPhone: string;
  customerAddress: string;

  items: InvoiceItem[];

  taxRate: number;

  notes: string;
};

export type SellerDefaults = {
  sellerName: string;
  sellerPhone: string;
  sellerAddress: string;
};