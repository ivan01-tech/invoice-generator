import "./SendInvoice.css";
import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { Link, useParams } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { getInvoiceByIdClient, sendInvoiceIdClient } from "../../services/InvoiceCrud"

function SendInvoice() {

  const { invoice_id } = useParams();
  // to get the initial invoice values
  const { error, loading, value, executeFn } = useAsyncFn(getInvoiceByIdClient);

  // state to manage sending of an email
  const { error: emailError, loading: emailLoad, value: emailVal, executeFn: onSendEmail } = useAsyncFn(sendInvoiceIdClient);

  // the state to verify if the email was send successfully and return a feedback to the client
  const [isEmailSuccess, setIsEmailSuccess] = useState("")
  const [isEmailMessage, setIsEmailMessage] = useState("")

  const SendInvoiceHandler = async function (e) {
    e.preventDefault();
    // TODO hit the route to send the email on the server

    onSendEmail({ invoice_id })
      .then((res) => {
        console.log("Form : ", res);
        setIsEmailSuccess(true)
        setIsEmailMessage(res.message)
      })
      .catch((err) => {
        setIsEmailSuccess(false)
        console.log("errform : ", err);
        setIsEmailMessage(err.message)
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

      { emailLoad && <h1>Sending email...</h1> }

      {
        emailError &&
        <div>
          <h1>{ isEmailMessage }</h1>
          <Link to={ "/" }>Go back </Link> <br />
          Or try Again
        </div>
      }
      {
        emailVal && <h1>{ emailVal?.message }</h1>
      }

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
        {/* items */ }
        {
          value?.items?.map((item) => (
            <div key={ item?._id }>
              <strong>{ item.title }</strong>
              <strong>{ item.hours }</strong>
              <strong>{ item.rate }</strong>
            </div>
          ))
        }
      </div>
      <div className="totalPrice">
        <h4>Total: US$ { totalSum }</h4>
      </div>
      <button onClick={ SendInvoiceHandler }>Send</button>
    </div>
  );
}

export default SendInvoice;
