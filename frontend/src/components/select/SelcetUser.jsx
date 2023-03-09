import React, { useState } from "react";
import profile from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SelcetUser.css";
import SelectOptions from "../SelectOptions";

const fakeUser = [
  { id: 0, name: "Ivan Silatsa", image: profile },
  { id: 1, name: "Carlos Ivan", image: profile },
  { id: 2, name: "Kakeu Silatsa", image: profile },
  { id: 3, name: "Carlos Kakeu", image: profile },
];

function SelcetUser() {
  const [isOpen, setisOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(0);

  // to open or close options
  const handleOpenOptions = function () {
    setisOpen((prev) => !prev);
  };

  const handleSelectOptions = function (id) {
    setselectedUserId(id);
  };

  return (
    <>
      <div className="selectWrapper" onClick={handleOpenOptions}>
        <div className="currentItem">
          <img
            style={{
              cursor: "pointer",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            width={"40px"}
            height={40}
            src={fakeUser[selectedUserId].image}
            alt="profile"
          />
          <h4>{fakeUser[selectedUserId].name}</h4>
        </div>

        <div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <ul className={`userOptions ${isOpen ? "show" : ""}`} tabIndex={0}>
          {fakeUser.map((user) =>
            user.id === selectedUserId ? (
              <SelectOptions
                handleSelectOptions={handleSelectOptions}
                key={user.id}
                user={user}
                isSelected
              />
            ) : (
              <SelectOptions
                handleSelectOptions={handleSelectOptions}
                key={user.id}
                user={user}
              />
            )
          )}
        </ul>
      </div>
    </>
  );
}

export default SelcetUser;
