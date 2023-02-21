import React from "react";
import "./invoice.css";
import SelcetUser from "../select/SelcetUser";
import SingleInput from "../Single/SingleInput";
function GenerateInvoiceForm() {
  return (
    <div className="genInvoiceWrap">
      <h3>Generate Invoice</h3>
      <p>Cleint</p>
      <SelcetUser />
      <form className="genInvoiceWrapForm">
        <div className="inputTitle">
          <p>Item</p>
          <p>Rate</p>
          <p>Hours</p>
        </div>
        <SingleInput />
        <SingleInput />
        <SingleInput />
        <SingleInput />
        <SingleInput />

        <div className="formFooter">
          <div className="price">
            <span>Total : </span>
            <strong>$ 3209</strong>
          </div>
          <button>Done</button>
        </div>
      </form>
    </div>
  );
}

export default GenerateInvoiceForm;
