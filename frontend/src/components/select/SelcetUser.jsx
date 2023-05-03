import React, { useEffect, useState } from "react";
import profile from "../../assets/profile.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./SelcetUser.css";
import SelectOptions from "../SelectOptions";
import { useUsers } from "../../hooks/useUsers";

function SelcetUser({ setselectedUserId, selectedUserId, selectUserById }) {
  // get the list of user to populate the component
  const { error, loading, Users } = useUsers();

  const [isOpen, setisOpen] = useState(false);
  // pass the const [selectedUserId, setselectedUserId] = useState(null);

  // to open or close options
  const handleOpenOptions = function () {
    setisOpen((prev) => !prev);
  };

  const handleSelectOptions = function (id) {
    setselectedUserId(id);
  };

  useEffect(
    function () {
      if (Users?.length > 0) {
        setselectedUserId(Users[0]._id);
      }
    },
    [Users, setselectedUserId]
  );

  if (!Users?.length > 0) return <h1>{error}</h1>;

  const currentUser = selectUserById(selectedUserId);

  console.log(currentUser);
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
            src={currentUser?.image || profile}
            alt="profile"
          />
          <h4>{currentUser?.fullname}</h4>
        </div>

        <div>
          <FontAwesomeIcon icon={faChevronDown} />
        </div>
        <ul className={`userOptions ${isOpen ? "show" : ""}`} tabIndex={0}>
          {Users.map((user) =>
            user._id === selectedUserId ? (
              <SelectOptions
                handleSelectOptions={() => handleSelectOptions(user?._id)}
                key={user._id}
                user={user}
                isSelected
              />
            ) : (
              <SelectOptions
                handleSelectOptions={() => handleSelectOptions(user?._id)}
                key={user._id}
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
