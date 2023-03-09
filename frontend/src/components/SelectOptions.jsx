import React from "react";
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
        src={user.image}
        alt="profile"
      />
      <h4>{user.name}</h4>
    </li>
  );
}

export default SelectOptions;
