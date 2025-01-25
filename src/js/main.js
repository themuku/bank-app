import { accounts } from "./constants";
import {
  getActiveAccount,
  logoutAccount,
  storeActiveAccount,
} from "./storeAccount";

const navMenu = document.querySelector(".nav-menu");
const logoutBtn = navMenu.querySelector("button");
const main = document.querySelector("main");
const accountNumber = main.querySelector(".account-number");
const toaster = document.querySelector(".toaster");
const showBtn = document.querySelector(".show-btn");
const hideBtn = document.querySelector(".hide-btn");
const balance = main.querySelector(".balance");
const cardInfo = document.querySelector(".card-info");
const operationsForm = document.querySelector(".operations-form");
const accountNumberInput = operationsForm.querySelector("input");
const amount = operationsForm.querySelector(".amount");

const account = getActiveAccount();

let isToasterVisible = false;
let isCvvVisible = false;

navMenu.querySelector("img").src = account.profileUrl;
navMenu.querySelector("span").textContent = account.name;
accountNumber.textContent = account.accountNumber;
balance.textContent = `${account.balance} AZN`;

logoutBtn.addEventListener("click", () => {
  logoutAccount();
  window.location = "login.html";
});

accountNumber.addEventListener("click", (event) => {
  const accNum = event.target.textContent;
  isToasterVisible = true;
  toast(isToasterVisible);
  navigator.clipboard.writeText(accNum);
});

function toast(isVisible, isError = false) {
  let html = "";
  if (isVisible) {
    if (!isError) {
      html = `
      <div class="toaster animate__animated animate__bounceInDown">
      <i class="fa-solid fa-circle-check check"></i>
      <span>Success</span>
      </div>
      `;
    } else {
      html = `
      <div class="toaster animate__animated animate__bounceInDown">
      <i class="fa-solid fa-circle-minus error"></i>
      <span>Error</span>
      </div>
      `;
    }
  }

  main.innerHTML += html;

  setTimeout(() => {
    main.innerHTML = main.innerHTML.replace(html, "");
    isToasterVisible = false;
  }, 2000);
}

showBtn.addEventListener("click", (event) => {
  event.target.style.display = "none";
  hideBtn.style.display = "inline-block";

  balance.textContent = "*".repeat(String(account.balance).length) + " AZN";
});

hideBtn.addEventListener("click", (event) => {
  event.target.style.display = "none";
  showBtn.style.display = "inline-block";

  balance.textContent = `${account.balance} AZN`;
});

const expiryDate = new Date(account.date);

cardInfo.querySelector(".expiry-date").textContent = `${
  expiryDate.getMonth() < 10
    ? `0${expiryDate.getMonth() + 1}`
    : expiryDate.getMonth() + 1
}/${String(expiryDate.getFullYear()).substring(2)}`;

cardInfo.querySelector(".cvv").addEventListener("click", (event) => {
  if (isCvvVisible) {
    event.target.textContent = "***";
    isCvvVisible = false;
  } else {
    event.target.textContent = account.cvv;
    isCvvVisible = true;
  }
});

operationsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const accNum = accountNumberInput.value;

  const foundAccount = accounts.find((acc) => acc.accountNumber === accNum);

  if (!foundAccount || account.balance < +amount.value) {
    isToasterVisible = true;
    toast(isToasterVisible, true);
    return;
  }

  foundAccount.balance += +amount.value;
  account.balance -= +amount.value;
  storeActiveAccount(account);
  balance.textContent = `${account.balance} AZN`;
});
