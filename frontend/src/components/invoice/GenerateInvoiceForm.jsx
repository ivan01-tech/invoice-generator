import React, { useState } from "react";
import "./invoice.css";
import SelcetUser from "../select/SelcetUser";

const ITEM_FIELDS = {
  item: "item",
  hours: "hours",
  rate: "rate",
};

function GenerateInvoiceForm() {
  // state to add new item in the invoice
  const [Items, setItems] = useState([
    {
      item: "",
      hours: 0,
      rate: 0,
    },
  ]);

  // a function to add a new item in the list
  const handleAddNewItem = () => {
    const inputAreFilled = Items.every(
      (item) => Boolean(item.hours) && Boolean(item.item) && Boolean(item.rate)
    );
    // TODO manage error message
    inputAreFilled &&
      setItems((prev) => [
        ...prev,
        {
          item: "",
          hours: 0,
          rate: 0,
        },
      ]);
  };

  // function to update items inputs
  const handleChangeItemValue = (e, ind, field) => {
    setItems((prev) => {
      const newObj = { ...prev[ind], [field]: e.target.value };
      prev[ind] = newObj;
      return [...prev];
    });
  };

  //  a constant that content the total of all rate times hours
  const totalSum = Items.reduce((acc, item) => acc + item.hours * item.rate, 0);

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

              {Items.map((item, ind) => (
                <div className="inputItem " key={ind}>
                  <input
                    min={0.5}
                    step={0.1}
                    required
                    type="text"
                    name={`hours${ind}`}
                    value={item.item}
                    onChange={(e) =>
                      handleChangeItemValue(e, ind, ITEM_FIELDS.item)
                    }
                  />

                  <input
                    min={0.5}
                    step={0.1}
                    required
                    type="number"
                    name={`rate${ind}`}
                    value={Boolean(item.rate) ? item.rate : ""}
                    onChange={(e) =>
                      handleChangeItemValue(e, ind, ITEM_FIELDS.rate)
                    }
                  />

                  <input
                    type="number"
                    name={`hours${ind}`}
                    required
                    value={Boolean(item.hours) ? item.hours : ""}
                    onChange={(e) =>
                      handleChangeItemValue(e, ind, ITEM_FIELDS.hours)
                    }
                  />
                </div>
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
            <strong>US$ {totalSum}</strong>
          </div>
          <button type="submit">Done</button>
        </div>
      </form>
    </div>
  );
}

export default GenerateInvoiceForm;
