export const LANGUAGE = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
];

export const RESEND_TIME = 60;

export const DATE_FORMAT = {
  TIMESTAMP: 'DD MMM YYYY hh:MM A',
  DD_MMM_YYYY: 'DD-MMM-YYYY',
  YYYY_MM_DD: 'YYYY-MM-DD',
};

export const tagTypes = {
  checkDevice: 'CheckDevice',
  fetchParties: 'FetchParties',
  getDashboard: 'GetDashboard',
  fetchItems: 'FetchItems',
  fetchCustomPrice: 'FetchCustomPrice',
  fecthItemstoCustom: 'FecthItemstoCustom',
  fetchPartytoCustom: 'FetchPartytoCustom',
  fetchCoUser: 'FetchCoUser',
};

export const voucherFilter = [
  { value: '', label: 'All' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'sales', label: 'Sales' },
  { value: 'payment', label: 'Payment' },
  { value: 'receipt', label: 'Receipt' },
];

export const CASH_BOOK_FILTER = [
  { value: '', label: 'All' },
  { value: 'payment', label: 'Payment' },
  { value: 'receipt', label: 'Receipt' },
];

export const LEDGER_BOOK_FILTER = [
  { value: '', label: 'All' },
  { value: 'purchase', label: 'Purchase' },
  { value: 'sales', label: 'Sales' },
  { value: 'payment', label: 'Payment' },
  { value: 'receipt', label: 'Receipt' },
];

export const SHIFT = [
  { value: 'morning', label: 'Morning' },
  { value: 'evening', label: 'Evening' },
];
