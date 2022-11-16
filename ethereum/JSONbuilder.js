const fs = require("fs-extra");
const path = require("path");
const { readFileSync } = require('fs');

const jsonPath = path.resolve(__dirname, "metadata", "1.json");

export function setupFile(counter, jsonPath, cid) {
  //create file here

  generateJSONdata(cid);
}

function generateJSONdata(cid) {
  //push JSON object into file here
}
