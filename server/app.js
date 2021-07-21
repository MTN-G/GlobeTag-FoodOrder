const express = require("express");
const fs = require("fs");

const app = express();

app.use(express.json());

const dirPath = "./files/";

// create new file function
const newFile = (date) => {
  fs.writeFile(dirPath + date + ".txt", date, (err) => {
    console.log(err);
  });
};

const fileExist = () => {
  let date = new Date();
  date = date.toDateString();
  if (fs.existsSync(dirPath + date + ".txt")) {
  } else {
    newFile(date);
  }
};

const newLine = (file, data) => {
  fs.appendFile(file, "/n" + data + "/n-----------------------");
};

app.post("/append", (req, res) => {
  fileExist();
  res.send("ok");
});

module.exports = app;
