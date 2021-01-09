const fs = require("fs");
const csv = require("fast-csv");

module.exports = loadPincodeCityStateMapIntoTable

function loadPincodeCityStateMapIntoTable(filepath, table) {
  try {

    let pincodeCityStatePairs = [];

    fs.createReadStream(filepath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => {
        throw error.message;
      })
      .on("data", (row) => {
        row['city'] = row['city'].toLowerCase().trim().replace("&","and");
        row['state'] = row['state'].toLowerCase().trim().replace("&", "and");
        pincodeCityStatePairs.push(row);
      })
      .on("end", () => {
        table.bulkCreate(pincodeCityStatePairs, { ignoreDuplicates: true })
          .catch((error) => {
            console.log(error.message)
          });
      });
  } catch (error) {
    console.log(error);
  }
};