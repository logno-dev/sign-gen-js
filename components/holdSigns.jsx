import { client } from "./client.js";

// const urlParams = new URLSearchParams(window.location.search);

let lastID;
let lastPrefix;
let lastDate;

const today = new Date().toLocaleDateString("en-CA");

async function getLastID() {
  const data = await client
    .execute("select * from hold order by id desc limit 1")
    .then((result) => {
      lastID = Number(result.rows[0].id);
      lastPrefix = result.rows[0].prefix;
      lastDate = result.rows[0].date;
    });
}

async function addSign(reason, issuedby, pending, qty, date) {
  let prefix;
  if (date == lastDate) {
    prefix = String.fromCharCode(lastPrefix.charCodeAt(0) + 1);
  } else {
    prefix = "A";
  }

  const data = await client.execute({
    sql: "insert into hold values (:id, :reason, :issuedby, :pending, :prefix, :qty, :date)",
    args: {
      id: Number(lastID + 1),
      reason: reason,
      issuedby: issuedby,
      pending: pending,
      prefix: prefix,
      qty: Number(qty),
      date: date,
    },
  });
}
getLastID();

function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const reason = formData.get("reason");
  const issuedBy = formData.get("issued-by");
  const pending = formData.get("pending");
  const qty = formData.get("qty");
  const date = formData.get("date") + "T12:00:00";
  try {
    addSign(reason, issuedBy, pending, qty, date);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("sign added");
  }
}

export const holdSigns = () => {
  document.querySelector("#app").innerHTML = `
<form id="add-sign-form">
  <label>Reason:
  <input type="text" name="reason" required></label>
  <label>Issued By:
  <input type="text" name="issued-by" required></label>
  <label>Pending:
    <input type="text" name="pending" required></label>
  <label>QTY:
  <input type="number" name="qty" required></label>
  <label>Date:
  <input type="date" name="date" value=${today} required></label>
  <button type="submit" >Submit</button>
</form>
  `;
  document
    .querySelector("#add-sign-form")
    .addEventListener("submit", handleSubmit);
};
