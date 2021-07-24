import { useEffect, useState } from "react";
import axios from "axios";

function Form() {
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [notes, setNotes] = useState("");
  const [drink, setDrink] = useState("");
  const [existNames, setNames] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await (await axios.get("/names")).data;
      setNames(data);
    }
    getData();
    setName("");
  }, [update]);

  async function handleSubmit(name, food, notes, drink) {
    if ((name, food, drink)) {
      if (!update) {
        await axios.post("/append", {
          newLine: `Name: ${name}\n Food: ${food}\n Notes: ${notes}\n Drink: ${drink}`,
        });
      } else {
        await axios.put(`/update/${name}`, {
          newLine: `Name: ${name}\n Food: ${food}\n Notes: ${notes}\n Drink: ${drink}`,
        });
      }
    } else {
      alert("hey");
    }
  }
  console.log(name);
  return (
    <div>
      <div className="form">
        <div>
          {update ? (
            <div>
              for new order{" "}
              <b onClick={() => setUpdate(false)} className={"updateLink"}>
                click here.
              </b>
            </div>
          ) : (
            <div>
              hey, please enter your lunch order in the fields below. <br />
              If you have already ordered{" "}
              <b onClick={() => setUpdate(true)} className={"updateLink"}>
                click here for updating.
              </b>
            </div>
          )}
        </div>
        {update ? (
          <select defaultValue={""} onChange={(e) => setName(e.target.value)}>
            <option>{null}</option>
            {existNames.map((name) => (
              <option>{name}</option>
            ))}
          </select>
        ) : (
          <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        )}
        <input placeholder="Food" onChange={(e) => setFood(e.target.value)} />
        <input placeholder="Notes" onChange={(e) => setNotes(e.target.value)} />
        <input placeholder="Drink" onChange={(e) => setDrink(e.target.value)} />
        <button onClick={() => handleSubmit(name, food, notes, drink)}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;
