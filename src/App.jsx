import { Route, Routes } from "react-router-dom";
import "./App.css";
import NewClientForm from "./components/new/NewClientForm";
import Layout from "./components/layout/Layout";
import Home from "./components/pages/Home";
import GenerateInvoiceForm from "./components/invoice/GenerateInvoiceForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="new" element={<NewClientForm />} />
          <Route path="generate" element={<GenerateInvoiceForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
