import React from "react";
import profile from "../assets/profile.png";
function SelectOptions({ user, handleSelectOptions, isSelected }) {
  //  a string that represent the classname
  const classNameString = isSelected ? "userItem active" : "userItem";

  return (
    <li
      className={classNameString}
      onClick={(e) => handleSelectOptions(user.id)}
    >
      <img
        style={{
          cursor: "pointer",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        width={"40px"}
        height={40}
        src={ profile}
        alt="profile"
      />
      <h4>{user.fullname}</h4>
    </li>
  );
}

export default SelectOptions;
