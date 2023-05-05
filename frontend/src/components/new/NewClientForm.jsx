import React, { useState } from "react";
import "./newform.css";
import {useNavigate} from "react-router-dom"
import { createUser } from "../../services/UserCrud"
import profile from "../../assets/profile.png";
import { useRef } from "react";
import { useAsyncFn } from "../../hooks/useAsync";
import { useUsers } from "../../hooks/useUsers";

// const PHONE_REGEX = "$(+237|237)s(6|2)(2|3|[5-9])[0-9]{7}/^";

function NewClientForm() {
  const navigate = useNavigate()
  // state to manage posting of a user
  const { executeFn, error, loading } = useAsyncFn(createUser)
  const {updateUsersListLocal} = useUsers()
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

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const fullname = inputRef.current[0].value;
    const phone = inputRef.current[2].value;
    const email = inputRef.current[1].value;
    // check if the fullname have at least 2 word with more than three chars each one
    const isfnCorrect = fullname.split(" ").every((part) => part.length >= 4);

    // checking for the number as cameroon number's
    // const isPhoneCorrect = phone.match(PHONE_REGEX);

    console.log(fullname, phone, email);
    // console.log(isfnCorrect, isPhoneCorrect);

    if (!isfnCorrect) return setisFnErr(true);
    // if (!isPhoneCorrect) return setisPhoneErr(true);

    executeFn({ fullname, phone, email }).then(res => {
      updateUsersListLocal(res)
      // navigate to the home page
      navigate("/")
    }).catch(err=>{
      console.log("ctach : ",err)
    })

  };

  return (
    <div className="newFormWrap">
      <h3>Client Informations</h3>
      <form onSubmit={submitFormHandler}>

        {/* display error and loadind */}
        {error && <div className="error">{error}</div>}
        {loading && <div className="error">{loading}</div>}

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
