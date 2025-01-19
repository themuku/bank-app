import { getActiveAccount, logoutAccount } from "./storeAccount";

const navMenu = document.querySelector(".nav-menu");
const logoutBtn = navMenu.querySelector("button");
const main = document.querySelector("main");
const accountNumber = main.querySelector(".account-number");
const toaster = document.querySelector(".toaster");
const showBtn = document.querySelector(".show-btn");

const account = getActiveAccount();

let isToasterVisible = false;

navMenu.querySelector("img").src = account.profileUrl;
navMenu.querySelector("span").textContent = account.name;
accountNumber.textContent = account.accountNumber;
main.querySelector(".balance").textContent = `${account.balance} AZN`;

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

function toast(isVisible) {
  let html = "";
  if (isVisible) {
    html = `
    <div class="toaster animate__animated animate__bounceInDown">
      <i class="fa-solid fa-circle-check check"></i>
      <span>Success</span>
    </div>
    `;
  } else {
  }

  main.innerHTML += html;

  setTimeout(() => {
    main.innerHTML = main.innerHTML.replace(html, "");
  }, 2000);
}

showBtn.addEventListener("click", (event) => {
  event;
});
