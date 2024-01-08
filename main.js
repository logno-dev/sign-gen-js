import "./style.css";
import { holdSigns } from "./components/holdSigns.jsx";
import { listSigns } from "./components/listSigns.js";
import { printSigns } from "./components/printSigns.js";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { createClient } from "@libsql/client/web";

const urlParams = new URLSearchParams(window.location.search);

const query = urlParams.get("name");

// const client = createClient({
//   url: import.meta.env.VITE_DB_URI,
//   authToken: import.meta.env.VITE_DB_TOKEN,
// });

function home() {
  document.querySelector("#app").innerHTML = `
<div>
  <a href="#hold-sign">Hold Sign</a>
  <a href="#expire">Experation Extensions</a>
</div >
<div id="sign-list">Loading List...</div>
`;
  listSigns();
}

function router() {
  switch (window.location.hash) {
    case "#hold-sign":
      holdSigns();
      break;
    case "#expire":
      expire();
      break;
    case "#print-sign":
      printSigns();
      break;
    default:
      home();
      break;
  }
}

router();

window.onhashchange = () => {
  router();
};
