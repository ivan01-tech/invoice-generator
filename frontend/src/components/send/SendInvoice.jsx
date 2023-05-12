import { ColorRing } from "react-loader-spinner"
import "./SendInvoice.css";
import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { Link, useParams } from "react-router-dom";
import { useAsyncFn } from "../../hooks/useAsync";
import { getInvoiceByIdClient, sendInvoiceIdClient } from "../../services/InvoiceCrud"
import CoustomMessage from "../CoustomMessage";
import { faCheckCircle, faXmark } from "@fortawesome/free-solid-svg-icons";

function SendInvoice() {

  const { invoice_id } = useParams();
  // to get the initial invoice values
  const { error, loading, value, executeFn } = useAsyncFn(getInvoiceByIdClient);

  // state to manage sending of an email
  const { error: emailError, loading: emailLoad, value: emailVal, executeFn: onSendEmail } = useAsyncFn(sendInvoiceIdClient);

  const SendInvoiceHandler = async function (e) {
    e.preventDefault();
    // TODO hit the route to send the email on the server

    onSendEmail({ invoice_id })
      .then((res) => {
        console.log("Form : ", res);
      })
      .catch((err) => {
        console.log("errform : ", err);
      });
    // const document = await console.log("doc = ", document);
  };

  // to request data when the page load
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

  // display the loader
  if (loading) return <ColorRing
    visible={ true }
    height="80"
    width="80"
    ariaLabel="blocks-loading"
    wrapperStyle={ {} }
    wrapperClass="blocks-wrapper"
    colors={ ['#e15b64'] }
  />
  // TODO display comp
  if (error) return <CoustomMessage message={ error } icon={ faXmark } color={ "error-alert" } />;

  const totalSum = value?.items?.reduce(
    (acc, item) => acc + item.hours * item.rate,
    0
  );

  if (emailVal) {
    return (<div>
      <CoustomMessage message={ emailVal?.message } icon={ faCheckCircle } color={ "success" } />
      <Link to={ "/" }>Go back to home </Link> <br />
    </div>)
  }

  return (
    <div className="sendWrap">
      {
        emailError &&
        <div>
          <CoustomMessage message={ emailError } icon={ faXmark } color={ "error-alert" } />
          <Link to={ "/" }>Go back to home </Link> <br />
          Or try Again
        </div>
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
      <button onClick={ SendInvoiceHandler } disabled={ emailLoad }>
        { emailLoad ? <ColorRing
          visible={ true }
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={ {} }
          wrapperClass="blocks-wrapper"
          colors={ ['white', 'white', 'white', 'white', 'white'] }
        /> :
          <span>
            Send
          </span> }
      </button>
    </div>
  )
}

export default SendInvoice;
