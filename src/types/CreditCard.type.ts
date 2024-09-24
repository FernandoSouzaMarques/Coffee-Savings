export interface ICreditCard {
  id: number;
  name: string;
  icon: string;
  closingDate: string;
  expirationDate: string;
  currentInvoice: number;
  limit: number;
  accountId: number;
}