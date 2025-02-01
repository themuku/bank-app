import { accounts as allAccounts } from "./constants";
import { storeAccount, getAccount } from "./storeAccount";

const form = document.querySelector(".login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = event.target[0].value;
  const password = event.target[1].value;

  fetch("http://localhost:3000/accounts")
    .then((res) => res.json())
    .then((data) => {
      const foundAccount = data.find(
        (acc) => acc.email === email && acc.password === password
      );

      if (foundAccount) {
        storeAccount(foundAccount.id);
        window.location = "main.html";
      } else {
        alert("Invalid credentials");
      }
    });
});
