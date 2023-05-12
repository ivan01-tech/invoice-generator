import { makeRequest } from "./makeRequest";

/**
 * to add new invoice
 * @param {{userId:string,items:Array}}} params
 * @returns
 */
export const createInvoice = function (params) {
  return makeRequest("/invoices", {
    method: "POST",
    data: JSON.stringify(params),
  });
};

export const getInvoiceByIdClient = function ({ invoice_id }) {
  return makeRequest(`/invoices/${invoice_id}`, {
    method: "POST",
    data: JSON.stringify({ invoice_id }),
  });
};

export const sendInvoiceIdClient = function ({ invoice_id }) {
  return makeRequest(`/invoices/${invoice_id}/send_email`, {
    method: "POST",
    data: JSON.stringify({ invoice_id }),
  });
};
