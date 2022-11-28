import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Name from "./Components/Person";

////////////////////////////////////////////////////////////////////////////////
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("effect");

    axios.get("http://localhost:3002/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  ///////////////////////////////Checking Name and Number///////////////////////////////////////////////
  const addData = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      if (newName === "" && newNumber === "") {
        alert(`Add name and number`);
      } else if (newNumber === "") {
        alert(`Add number`);
      } else {
        alert(`Add name`);
      }
    } else if (
      !JSON.stringify(persons).includes('"name":' + '"' + newName + '"')
    ) {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(personObject));
      setNewName("");
      setNewNumber("");
      console.log(persons);
    } else if (
      JSON.stringify(persons).includes('"name":' + '"' + newName + '"')
    ) {
      alert(`${newName} is already in the Phonebook`);
      setNewName("");
      setNewNumber("");
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////
  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  //////////////////////////////////////////////////////////////////////////////
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        search:
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addData}>
        <div>
          name:
          <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((person) => (
            <Name key={person.id} name={person.name} number={person.number} />
          ))}
      </ul>
    </div>
  );
};

export default App;
