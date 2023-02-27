import React, { useState } from "react";
import "./invoice.css";
import SelcetUser from "../select/SelcetUser";
import SingleInput from "../Single/SingleInput";

function GenerateInvoiceForm() {
  // state to add new item in the invoice
  const [numberOfItems, setNumberOfItems] = useState(1);

  // a function to add a new item in the list
  const handleAddNewItem = () => {
    setNumberOfItems((prev) => prev + 1);
  };
  return (
    <div className="genInvoiceWrap">
      <h3>Generate Invoice</h3>
      <p>Cleint</p>

      {/* select user component */}
      <SelcetUser />
      <form className="genInvoiceWrapForm">
        <div className="formBody">
          <div className="inpGrp">
            <div className="inpGrpItem">
              <div className="inputItem">
                <p>Item</p>
                <p>Rate</p>
                <p>Hours</p>
              </div>

              {new Array(numberOfItems).fill("").map((_item, ind) => (
                <SingleInput key={ind} />
              ))}
            </div>
          </div>

          <div className="addBtn">
            <div onClick={handleAddNewItem}>add item</div>
          </div>
        </div>

        <div className="formFooter">
          <div className="price">
            <span>Total : </span>
            <strong>$ 3209</strong>
          </div>
          <button type="submit">Done</button>
        </div>
      </form>
    </div>
  );
}

export default GenerateInvoiceForm;
