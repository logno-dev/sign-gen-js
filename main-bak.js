import "./style.css";
import { holdSigns } from "./components/holdSigns.jsx";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { createClient } from "@libsql/client/web";

const urlParams = new URLSearchParams(window.location.search);

const query = urlParams.get("name");

const client = createClient({
  url: import.meta.env.VITE_DB_URI,
  authToken: import.meta.env.VITE_DB_TOKEN,
});

const getData = async () => {
  const data = await client.execute("SELECT * FROM test").then((response) => {
    document.querySelector("#app").innerHTML = `
<div>
  <a href="https://vitejs.dev" target="_blank">
    <img src="${viteLogo}" class="logo" alt="Vite logo" />
  </a>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
  </a>
  ${holdSigns()}
  <p>
    ${response.rows[0][1]}
  </p>
  <p>
    ${query || "No query param"}
  </p>
  <form action="/test.html">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" />
    <input type="submit" value="Submit" />
  </form>
</div>
`;
  });
};

getData();
