const urlParams = new URLSearchParams(window.location.search);

const reason = urlParams.get("reason");
const issued = urlParams.get("issued");
const pending = urlParams.get("pending");
const prefix = urlParams.get("prefix");
const qty = urlParams.get("qty");
const date = urlParams.get("date");

const tag = date ? date.split("T")[0].split("-").join("") + prefix : "";

export const printSigns = () => {
  const app = document.querySelector("#app");
  app.innerHTML = "";
  for (let i = 1; i <= qty; i++) {
    app.innerHTML += `
<h1> QA HOLD</h1>
<h3>Reason: ${reason}</h3>
<h3>Issued: ${issued}</h3>
<h3>Pending: ${pending}</h3>
<h3>Tag: ${tag}${String(i).padStart(3, "0")}</h3>
<h5>Issued Date: ${date.split("T")[0]}</h5>
`;
  }
};

// http://localhost:5173/#print-sign?id=0&reason=QA%20Hold&issued=Logan%20Bunch&pending=QA%20Release&prefix=A&qty=3&date=2024-1-7T12:00:00&
