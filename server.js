import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { SERVER_HOST } from "./src/utils/constant";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const publicPath = path.join(__dirname, "dist");

app.use(express.static(publicPath));

app.use(express.json());

const dataFilePath = path.join(__dirname, "public", "data.json");

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.post(`${SERVER_HOST}/api/save`, (req, res) => {
  const newData = req.body;
  console.log("Data received on server:", newData);

  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data file" });
    }

    let jsonData = [];
    if (data) {
      jsonData = JSON.parse(data);
    }

    jsonData.push({
      ...newData,
      createdOn: new Date().toISOString(),
      updatedOn: new Date().toISOString(),
    });

    fs.writeFile(
      dataFilePath,
      JSON.stringify(jsonData, null, 2),
      "utf8",
      (err) => {
        if (err) {
          return res.status(500).json({ error: "Error writing data file" });
        }
        res.status(200).json({ message: "Data saved successfully" });
      }
    );
  });
});

app.get(`${SERVER_HOST}/api/data`, (req, res) => {
  fs.readFile(dataFilePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading data file" });
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  exec("astro build", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error during Astro build: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`Astro build stderr: ${stderr}`);
      return;
    }
    console.log(`Astro build stdout: ${stdout}`);
  });
});
