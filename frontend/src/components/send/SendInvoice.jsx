import React, { useEffect } from "react";
import profile from "../../assets/profile.png";
import "./SendInvoice.css";
import { useParams } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { sendInvoiceId } from "../../services/InvoiceCrud";

function SendInvoice() {
  const { invoice_id } = useParams();
  const { error, loading, value, executeFn } = useAsyncFn(sendInvoiceId);

  const SendInvoiceHandler = async function (e) {
    e.preventDefault();
    // TODO hit the route to send the email on the server

    executeFn({ invoice_id })
      .then((res) => {
        console.log("reeForm : ", res);
      })
      .catch((err) => {
        console.log("errform : ", err);
      });
    // const document = await console.log("doc = ", document);
  };

  useEffect(
    function () {
      executeFn({ invoice_id })
        .then((res) => {
          console.log("reeForm : ", res);
        })
        .catch((err) => {
          console.log("errform : ", err);
        });
    },
    [invoice_id, executeFn]
  );

  if (loading) return <h3>loading...</h3>;

  if (error) return <h3>{ error }</h3>;
  const totalSum = value?.items?.reduce(
    (acc, item) => acc + item.hours * item.rate,
    0
  );
  return (
    <div className="sendWrap">
      <strong>Invoice</strong>
      <div className="clientInfos">
        <div>
          <span>Client</span>
          <div className="clientName">
            <img
              style={ {
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
              } }
              width={ "30px" }
              height={ 30 }
              src={ profile }
              alt="profile"
            />
            <p>{ value?.user?.fullname }</p>
          </div>
        </div>
        <div>
          <span>{ value?.user?.phone }</span>
          <span>{ value?.user?.email }</span>
        </div>
        <div>
          <span>Phone</span>
          <span>+237 696 054 619</span>
        </div>
      </div>
      <div className="InvoiceDetails">
        <div>
          <p>Items</p>
          <p>Rate</p>
          <p>Hours</p>
        </div>
        { value?.items?.map((item) => (
          <div key={ item?._id }>
            <strong>{ item.title }</strong>
            <strong>{ item.hours }</strong>
            <strong>{ item.rate }</strong>
          </div>
        )) }
      </div>
      <div className="totalPrice">
        <h4>Total: US$ { totalSum }</h4>
      </div>
      <button onClick={ SendInvoiceHandler }>Send</button>
    </div>
  );
}

export default SendInvoice;
