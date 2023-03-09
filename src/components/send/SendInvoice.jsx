import React from "react";
import profile from "../../assets/profile.png";
import "./SendInvoice.css";

function SendInvoice() {
  return (
    <div className="sendWrap">
      <strong>Invoice</strong>
      <div className="clientInfos">
        <div>
          <span>Client</span>
          <div className="clientName">
            <img
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              width={"30px"}
              height={30}
              src={profile}
              alt="profile"
            />
            <p>Ivan Silatsa</p>
          </div>
        </div>
        <div>
          <span>Email</span>
          <span>ivansilatsa@gamil.com</span>
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
        <div>
          <strong>Ivan Silatsa</strong>
          <strong>$ 30.0</strong>
          <strong>4</strong>
        </div>
        <div>
          <strong>Ivan Silatsa</strong>
          <strong>$ 30.0</strong>
          <strong>4</strong>
        </div>
      </div>
      <div className="totalPrice">
        <h4>Total: US$ 60 </h4>
      </div>
      <button> Send</button>
    </div>
  );
}

export default SendInvoice;
