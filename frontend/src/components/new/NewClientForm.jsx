import React, { useState } from "react";
import "./newform.css";
import profile from "../../assets/profile.png";
import { useRef } from "react";

function NewClientForm() {
  // a ref to get all inputs value
  const inputRef = useRef([]);

  // state that content user profile
  const [ImageFile, setImageFile] = useState(null);

  // to show error message when input are not well filled
  const [isFnErr, setisFnErr] = useState(false);
  const [isPhoneErr, setisPhoneErr] = useState(false);
  const [isEmailErr, setisEmailErr] = useState(false);

  // a function to change the image profile of the user
  const handleChoseImage = (image) => {
    setImageFile(image);
  };
  // to add an input in the inputRef array
  const addInputRef = (elet) => {
    if (elet && !inputRef.current.includes(elet)) {
      inputRef.current.push(elet);
    }
    return;
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const fullname = inputRef.current[0].value;
    const isfnCorrect = fullname.split(" ").every((part) => part.length > 4);

    console.log(fullname);
    console.log(isfnCorrect);

    if (!isfnCorrect) return setisFnErr(true);

    return;
  };

  return (
    <div className="newFormWrap">
      <h3>Client Informations</h3>
      <form action="" onSubmit={submitFormHandler}>
        <div className="inputGrp">
          <label htmlFor="name">Full name </label>
          <input
            required
            placeholder="example : John Doe"
            type="text"
            name="name"
            id="name"
            className={`${isFnErr ? "error" : ""}`}
            ref={addInputRef}
          />
        </div>

        <div className="inputGrp">
          <label htmlFor="email">Email </label>
          <input
            ref={addInputRef}
            placeholder="john_doe@gmail.com"
            required
            type="email"
            name="email"
            id="email"
            className={`${isEmailErr ? "error" : ""}`}
          />
        </div>

        <div className="inputGrp">
          <label htmlFor="phone">Phone number </label>
          <input
            placeholder="+237 645 676 567"
            required
            type="text"
            name="phone"
            id="phone"
            ref={addInputRef}
            className={`${isPhoneErr ? "error" : ""}`}
          />
        </div>
        <div className="inputGrp">
          <label htmlFor="profile">
            <p>Profile Picture</p>
            <img
              style={{
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
              }}
              width={"80px"}
              height={80}
              src={ImageFile ? URL.createObjectURL(ImageFile) : profile}
              alt="profile"
            />
          </label>
          <input
            style={{
              display: "none",
            }}
            type="file"
            name="profile"
            id="profile"
            onChange={(e) => handleChoseImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button>Save Client</button>
      </form>
    </div>
  );
}

export default NewClientForm;
