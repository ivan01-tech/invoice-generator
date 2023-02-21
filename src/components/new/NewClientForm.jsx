import React from "react";
import "./newform.css";

function NewClientForm() {
  return (
    <div className="newFormWrap">
      <h3>Client Information</h3>
      <form action="">
        <div className="inputGrp">
          <label htmlFor="name">Full name </label>
          <input required type="text" name="name" id="name" />
        </div>

        <div className="inputGrp">
          <label htmlFor="email">Email </label>
          <input required type="email" name="email" id="email" />
        </div>

        <div className="inputGrp">
          <label htmlFor="phone">Phone number </label>
          <input required type="text" name="phone" id="phone" />
        </div>
        <button>Save Client</button>
      </form>
    </div>
  );
}

export default NewClientForm;
