import React from "react";
import "./SingleInput.css";

function SingleInput() {
  return (
    <div className="inputItem">
      <input required type="text" name="item" />
      <input required type="text" name="rate" />
      <input type="number" name="hour" required />
    </div>
  );
}

export default SingleInput;
