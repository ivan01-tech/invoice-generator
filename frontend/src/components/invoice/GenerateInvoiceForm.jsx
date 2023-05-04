import { useCallback, useState } from "react";
import "./invoice.css";
import SelcetUser from "../select/SelcetUser";
import { useUsers } from "../../hooks/useUsers";
import { useAsyncFn } from "../../hooks/useAsync";
import { createInvoice } from "../../services/InvoiceCrud";
import { useNavigate } from "react-router-dom";

const ITEM_FIELDS = {
  item: "item",
  hours: "hours",
  rate: "rate",
};
const initialItemState = {
  item: "",
  hours: 0,
  rate: 0,
};

function GenerateInvoiceForm() {
  const navigate = useNavigate();
  // state to manage posting of and invoice
  const {
    error: InvoiceError,
    executeFn,
    value,
    loading,
  } = useAsyncFn(createInvoice);

  // the select user Id
  const [selectedUserId, setselectedUserId] = useState(null);
  const { Users } = useUsers();

  // state to add new item in the invoice
  const [Items, setItems] = useState([initialItemState]);
  // boolean that represent
  const [error, setError] = useState(false);

  const checkIfAllInputAreFilled = useCallback(
    function () {
      return Items.every(
        (item) =>
          Boolean(item.hours) && Boolean(item.item) && Boolean(item.rate)
      );
    },
    [Items]
  );

  // a function to add a new item in the list
  const handleAddNewItem = () => {
    // to add new item others must be filled first
    const inputAreFilled = checkIfAllInputAreFilled();
    // TODO manage error message
    if (!inputAreFilled) {
      return setError(true);
    }

    return setItems((prev) => [
      ...prev,
      {
        item: "",
        hours: 0,
        rate: 0,
      },
    ]);
  };

  // function to update items inputs values
  const handleChangeItemValue = (e, ind, field) => {
    // hide the error message if exist first
    setError(false);
    setItems((prev) => {
      const value = e.target.value;
      // to make sure that the value is greater than 0
      console.log("ind : ", ind, value);
      if (field !== ITEM_FIELDS.item && !(parseFloat(value) > 0)) {
        return prev;
      }

      const newObj = { ...prev[ind], [field]: value };
      prev[ind] = newObj;
      return [...prev];
    });
  };

  // to select a user in the with base on it's ID
  function selectUserById(id) {
    return Users.find((user) => user?._id === id);
  }

  //  a constant that content the total of all rate times hours
  const totalSum = Items.reduce((acc, item) => acc + item.hours * item.rate, 0);

  // form submission handler
  const SubmitHandler = async function (e) {
    e.preventDefault();
    // check if all inputs items are filled
    const areFilled = checkIfAllInputAreFilled();
    if (!areFilled || !selectedUserId) {
      return setError(true);
    }
    // TODO make sure to update the invoice locally
    executeFn({ userId: selectedUserId, items: Items })
      .then((res) => {
        // refrzsh the state or navigate to the route
        console.log("resCalled : ", res);
        // we naviagte directly to the page were the invoice can be send
        navigate(`/send_invoice/${res?._doc._id}`);
      })
      .catch((err) => {
        console.log("err111 : ", err);
      });
  };
  console.log("value : ", value);
  return (
    <div className="genInvoiceWrap">
      <h3>Generate Invoice</h3>
      <p>Cleint</p>
      {/* displaying error */}
      {error && (
        <div className="error">
          Please please fill all input Or selcect a user
        </div>
      )}
      {InvoiceError && <div className="error">{InvoiceError}</div>}

      {/* select user component */}
      <SelcetUser
        selectedUserId={selectedUserId}
        setselectedUserId={setselectedUserId}
        selectUserById={selectUserById}
      />
      <form className="genInvoiceWrapForm" onSubmit={SubmitHandler}>
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
                    step={0.5}
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
                    step={0.5}
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
          <button type="submit">{loading ? "loading..." : "Done"}</button>
        </div>
      </form>
    </div>
  );
}

export default GenerateInvoiceForm;
