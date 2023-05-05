import SendInvoice from "./components/send/SendInvoice";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import GenerateInvoiceForm from "./components/invoice/GenerateInvoiceForm";
import NewClientForm from "./components/new/NewClientForm";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import BasicDocument from "./components/reactPds";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="new_user" element={<NewClientForm />} />
          <Route path="generate_invoice" element={<GenerateInvoiceForm />} />
          <Route path="send_invoice/:invoice_id" element={<SendInvoice />} />

          <Route path="pdf" element={<BasicDocument />} />

          {/* not found pages */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
