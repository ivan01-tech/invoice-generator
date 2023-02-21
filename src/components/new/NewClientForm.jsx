import React, { useState } from "react";
import "./newform.css";
import profile from "../../assets/profile.png";

function NewClientForm() {
  // state that content user profile
  const [ImageFile, setImageFile] = useState(null);

  // a function to change the image profile of the user
  const handleChoseImage = (image) => {
    setImageFile(image);
  };

  return (
    <div className="newFormWrap">
      <h3>Client Information</h3>
      <form action="">
        <div className="inputGrp">
          <label htmlFor="name">Full name </label>
          <input
            required
            placeholder="example : John Doe"
            type="text"
            name="name"
            id="name"
          />
        </div>

        <div className="inputGrp">
          <label htmlFor="email">Email </label>
          <input
            placeholder="john_doe@gmail.com"
            required
            type="email"
            name="email"
            id="email"
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
