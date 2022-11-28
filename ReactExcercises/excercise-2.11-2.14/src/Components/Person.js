import React from "react";

const Name = (props) => {
  return (
    <div>
      <li>
        {props.name} {props.number}
      </li>
    </div>
  );
};

export default Name;
