import React from "react";
import personService from "./Services/persons";

const Name = (props) => {
  const onDelete = (id) => {
    personService.deleteData(id);
  };

  return (
    <div>
      <li>
        {props.name} {props.number} {props.id}
        <button onClick={() => onDelete(props.id)}>Delete</button>
      </li>
    </div>
  );
};

export default Name;
