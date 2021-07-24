const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

const dirPath = "./files/";

// create new file function
const newFile = async (fileName) => {
  return fs
    .writeFile(
      fileName,
      new Date().toDateString() + "\n-----------------------"
    )
    .then(() => {
      return fileName;
    })
    .catch((err) => console.log(err.message));
};

// checking if file exist. in case not, create it with newFile func.
const fileExist = async () => {
  let date = new Date().toDateString();
  const fileName = dirPath + date + ".txt";
  console.log(typeof fileName);
  return fs
    .access(fileName)
    .then(() => {
      return fileName;
    })
    .catch(async (err) => {
      return await newFile(fileName);
    });
};

// append new line function
const newLine = async (file, data) => {
  await fs.appendFile(file, "\n" + data + "\n-----------------------");
};

// main endpoint, recieve the client content and adding it to the daily text file
app.post("/append", async (req, res) => {
  const fileName = await fileExist();
  try {
    await newLine(fileName, req.body.newLine);
    res.send("new line appended");
  } catch (err) {
    res.status(400).send(err);
  }
});

// get the names of those who ordered already
app.get("/names", async (req, res) => {
  const fileName = await fileExist();
  let fileContent = await fs.readFile(fileName, "utf8");
  // make an array of names from the txt file
  fileContent = fileContent.split("\n");
  const nameLines = fileContent.filter((line) => line.slice(0, 4) === "Name");
  const names = nameLines.map((line) => line.substring(6));
  res.send(names);
});

// update the txt file by given name.
app.put("/update/:name", async (req, res) => {
  let date = new Date().toDateString();
  const currName = req.params.name;
  const fileName = await fileExist();
  let fileContent = await fs.readFile(fileName, "utf8");
  // make an array of orders. if the name match, delete the old order and append the new one
  fileContent = fileContent.split("Name: ");
  const index = fileContent.findIndex(
    (order) => order.slice(0, currName.length) === currName
  );
  fileContent.splice(index, 1);
  fs.writeFile(fileName, fileContent.join("Name: ")).then(() => {
    newLine(fileName, req.body.newLine).then(() => {
      res.send("line updated");
    });
  });
});

module.exports = app;
