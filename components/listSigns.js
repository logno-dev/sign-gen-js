import { client } from "./client.js";
// const urlParams = new URLSearchParams(window.location.search);
//
// const query = urlParams.get("name");

export const listSigns = async () => {
  const data = await client
    .execute("SELECT * FROM hold order by id desc limit 30")
    .then((response) => {
      let table = document.createElement("table");
      response.rows.forEach((row) => {
        let tr = document.createElement("tr");
        let linkString = "";
        for (const [key, value] of Object.entries(row)) {
          let td = document.createElement("td");
          td.appendChild(document.createTextNode(value));
          tr.appendChild(td);
          linkString += key + "=" + value + "&";
          tr.addEventListener("click", () => {
            window.location.href = "/?" + linkString + "#print-sign";
          });
        }
        table.appendChild(tr);
      });

      document.querySelector("#sign-list").innerHTML = "";
      document.querySelector("#sign-list").appendChild(table);
    });
};
