import { useEffect, useState } from "react";
import axios from "axios";
import bonAppetit from "../bonappetit.png";

function Form() {
  // states declerations
  const [update, setUpdate] = useState(false);
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [notes, setNotes] = useState("");
  const [drink, setDrink] = useState("");
  const [existNames, setNames] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // get the names from the previous orders for the update featcher.
  useEffect(() => {
    async function getData() {
      const data = await (await axios.get("/names")).data;
      setNames(data);
    }
    getData();
    setName("");
    setSuccess(false);
  }, [update]);

  // validation and handling submiting.
  async function handleSubmit(name, food, notes, drink) {
    if (name.length && food.length && drink.length) {
      setError(false);
      try {
        if (!update) {
          await axios.post("/append", {
            newLine: `Name: ${name}\n Food: ${food}\n Notes: ${notes}\n Drink: ${drink}`,
          });
        } else {
          await axios.put(`/update/${name}`, {
            newLine: `Name: ${name}\n Food: ${food}\n Notes: ${notes}\n Drink: ${drink}`,
          });
        }
        setSuccess(true);
      } catch (error) {
        setError("Sorry, something went wrong please try again.");
      }
    } else {
      setError("Please fill name, food and drink");
    }
  }
  console.log(name);
  return (
    <div>
      <div>
        <div>
          {update ? (
            <div>
              For new order{" "}
              <b onClick={() => setUpdate(false)} className={"updateLink"}>
                click here.
              </b>
            </div>
          ) : (
            <div>
              Hey, please enter your lunch order in the fields below. <br />
              If you have already ordered{" "}
              <b onClick={() => setUpdate(true)} className={"updateLink"}>
                click here for updating.
              </b>
            </div>
          )}
        </div>
        {success ? (
          <img src={bonAppetit} alt="food"></img>
        ) : (
          <div className="form">
            {update ? (
              <select
                defaultValue={""}
                onChange={(e) => setName(e.target.value)}
              >
                <option>{null}</option>
                {existNames.map((name) => (
                  <option>{name}</option>
                ))}
              </select>
            ) : (
              <input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <input
              placeholder="Food"
              onChange={(e) => setFood(e.target.value)}
            />
            <input
              placeholder="Notes"
              onChange={(e) => setNotes(e.target.value)}
            />
            <input
              placeholder="Drink"
              onChange={(e) => setDrink(e.target.value)}
            />
            {error ? <div style={{ color: "red" }}>{error}</div> : ""}

            <button onClick={() => handleSubmit(name, food, notes, drink)}>
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Form;
