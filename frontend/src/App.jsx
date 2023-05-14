import "./App.css";
import SendInvoice from "./components/send/SendInvoice";
import { Route, Routes } from "react-router-dom";
import GenerateInvoiceForm from "./components/invoice/GenerateInvoiceForm";
import NewClientForm from "./components/new/NewClientForm";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout /> }>
          <Route index element={ <Home /> } />
          <Route path="new_user" element={ <NewClientForm /> } />
          <Route path="generate_invoice" element={ <GenerateInvoiceForm /> } />
          <Route path="send_invoice/:invoice_id" element={ <SendInvoice /> } />

          {/* not found pages */ }
          <Route path="*" element={ <NotFound /> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
