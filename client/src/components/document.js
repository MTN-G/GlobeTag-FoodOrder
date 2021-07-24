import { useState } from "react";
import axios from "axios";

function Document() {
  const [text, setText] = useState();

  async function handleClick() {
    if (text) {
      setText();
    } else {
      const data = await axios.get("/document");
      data.data.splice(0, 1);
      let arrayText = data.data.map((order) => order.split("\n"));
      arrayText.pop();
      setText(arrayText);
    }
  }

  return (
    <div onClick={() => handleClick()} className="document">
      <button style={{ backgroundColor: "#f2f2f2" }}>
        {text ? "Hide" : "Show"} today's orders
      </button>
      {text ? (
        <table>
          <tr>
            <td>Name</td>
            <td>Food</td>
            <td>Notes</td>
            <td>Drink</td>
          </tr>
          {text &&
            text.map((line) => (
              <tr className="order">
                <td>{line[1].split("").splice(6).join("")}</td>
                <td>{line[2].split("").splice(6).join("")}</td>
                <td>{line[3].split("").splice(7).join("")}</td>
                <td>{line[4].split("").splice(7).join("")}</td>
              </tr>
            ))}
        </table>
      ) : (
        ""
      )}
    </div>
  );
}

export default Document;
