import { createContext, useEffect, useState } from "react"
import { useAsync } from '../hooks/useAsync';
import { getAllInvoices } from '../services/InvoiceCrud';

export const InvoiceContext = createContext({})

function InvoicesContextProvider({ children }) {
    //get the list of Invoices
    const { error, loading, value: Invoice } = useAsync(getAllInvoices)
    // list of Invoice in local
    const [Invoices, setInvoices] = useState()

    const updateInvoicesListLocal = function (params) {
        setInvoices(prev => [...prev, params])
    }

    // to st the list of Invoices
    useEffect(function () {
        setInvoices(Invoices)
    }, [Invoices])

    const value = {
        error, loading, Invoices: Invoices, updateInvoicesListLocal
    }

    return <InvoiceContext.Provider value={value}>  {children}</InvoiceContext.Provider>

}

export default InvoicesContextProvider
