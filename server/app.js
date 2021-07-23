const express = require("express");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

const dirPath = "./files/";

// create new file function
const newFile = async (fileName) => {
  return fs
    .writeFile(fileName, new Date().toDateString())
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
    res.send(err);
  }
});

module.exports = app;
