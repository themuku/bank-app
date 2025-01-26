import { accounts as allAccounts } from "./constants";
import { storeAccount, getAccount } from "./storeAccount";

const form = document.querySelector(".login-form");

let accounts = getAccount("accounts") ? getAccount("accounts") : allAccounts;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const password = event.target[1].value;

  const foundAccount = accounts.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (foundAccount) {
    storeAccount(foundAccount);
    window.location = "main.html";
  } else {
    alert("Invalid credentials");
  }
});
