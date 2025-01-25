import { accounts } from "./constants";
import { storeActiveAccount } from "./storeAccount";

const form = document.querySelector(".login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;

  const foundAccount = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );
  console.log(foundAccount);

  if (foundAccount) {
    storeActiveAccount(foundAccount);
    window.location = "main.html";
  } else {
    alert("Invalid credentials");
  }
});
