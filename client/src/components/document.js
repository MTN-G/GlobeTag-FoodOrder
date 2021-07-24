import { useState } from "react";
import axios from "axios";

function Document() {
  const [text, setText] = useState();

  async function handleClick() {
    if (text) {
      setText();
    } else {
      const data = await axios.get("/document");
      console.log(data);
      setText(data.data);
      console.log(text);
    }
  }

  return (
    <div onClick={() => handleClick()} className="document">
      <p>{text ? "Hide" : "Show"} today's orders</p>
      {text ? (
        <div>
          {text.map((line) => (
            <div>{line}</div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Document;
