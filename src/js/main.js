import { getAccount, logoutAccount } from "./storeAccount";
import dayjs from "dayjs";

const logoutBtn = document.querySelector(".nav-menu button");
const main = document.querySelector("main");
const accountNumber = document.querySelector("main .account-number");
const showBtn = document.querySelector(".show-btn");
const hideBtn = document.querySelector(".hide-btn");
const balance = document.querySelector("main .balance");
const cardInfo = document.querySelector(".card-info");
const accountNumberInput = document.getElementById("accountNumber");
const amount = document.querySelector(".operations-form .amount");
const historyList = document.querySelector(".history-panel ul");
const historyClearBtn = document.querySelector(".clear-all");
const transferBtn = document.querySelector(".transfer-btn");
const cashbackAmount = document.querySelector(".cashback-amount");

const CASHBACK_RATE = 0.05;

let account = null;

let accountId = getAccount();

let isToasterVisible = false;
let isCvvVisible = false;

fetch(`http://localhost:3000/accounts/${accountId}`)
  .then((res) => res.json())
  .then((acc) => {
    document.querySelector(".nav-menu img").src = acc.profileUrl;
    document.querySelector(".nav-menu span").textContent = acc.name;
    accountNumber.textContent = acc.accountNumber;
    balance.textContent = `${acc.balance} AZN`;
    cashbackAmount.innerHTML = `${acc.cashback * 100} Halal<span>COINS</span>`;

    cardInfo.querySelector(".expiry-date").textContent = dayjs(
      acc.expiryDate
    ).format("MM/YY");

    renderHistoryList(acc.history);

    ///////////////////
    account = { ...acc };
  });

function renderHistoryList(list) {
  if (list.length === 0) {
    historyList.innerHTML = "";
    return;
  }
  historyList.innerHTML = "";

  list.toReversed().forEach((transfer) => {
    const { date, to, from, amount } = transfer;

    const message = amount > 0 ? from : to;
    const formattedDate = dayjs(date)
      .locale("az-az")
      .format("DD.MM.YYYY, HH:mm");

    historyList.innerHTML += `
    <li>
      <div>
        <i class="fa-solid fa-circle-${amount > 0 ? "plus" : "minus"} ${
      amount > 0 ? "plus" : "minus"
    }"></i>
        <p>${message}</p>
        <span class="history-date">${formattedDate}</span>
      </div>
      <p class="${amount > 0 ? "plus" : "minus"}">${amount} AZN</p>
    </li>
    `;
  });
}

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

export function toast(isVisible, isError = false, message = "") {
  let html = "";
  message = message.length > 0 ? message : !isError ? "Success" : "Error";

  if (isVisible) {
    if (!isError) {
      html = `
      <div class="toaster animate__animated animate__bounceInDown">
      <i class="fa-solid fa-circle-check check"></i>
      <span>${message}</span>
      </div>
      `;
    } else {
      html = `
      <div class="toaster animate__animated animate__bounceInDown">
      <i class="fa-solid fa-circle-minus error"></i>
      <span>${message}</span>
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

cardInfo.querySelector(".cvv").addEventListener("click", (event) => {
  if (isCvvVisible) {
    event.target.textContent = "***";
    isCvvVisible = false;
  } else {
    event.target.textContent = account.cvv;
    isCvvVisible = true;
  }
});

transferBtn.addEventListener("click", () => {
  const accNum = accountNumberInput.value;

  fetch("http://localhost:3000/accounts")
    .then((res) => res.json())
    .then((acc) => {
      const foundAccount = acc.find((acc) => acc.accountNumber === accNum);

      if (!foundAccount) {
        toast(isToasterVisible, true, "Wrong account number");
        return;
      }

      if (account.balance < +amount.value) {
        toast(isToasterVisible, true, "Insufficient funds");
        return;
      }

      if (account.balance < 1) {
        toast(isToasterVisible, true, "Enter amount greate than 1 AZN");
        return;
      }

      foundAccount.balance += +amount.value;
      account.balance -= +amount.value;
      // TODO
      account.cashback += +amount.value * CASHBACK_RATE;

      const operationDate = new Date();

      account.history.push({
        date: operationDate,
        to: foundAccount.name,
        from: "",
        amount: -amount.value,
      });

      foundAccount.history.push({
        date: operationDate,
        to: "",
        from: account.name,
        amount: amount.value,
      });

      renderHistoryList(account.history);

      balance.textContent = `${account.balance} AZN`;

      amount.value = "";
      accountNumberInput.value = "";

      toast(isToasterVisible, false, "Transfer was successful");

      fetch(`http://localhost:3000/accounts/${accountId}`, {
        method: "POST",
        body: JSON.stringify(account),
      });

      fetch(`http://localhost:3000/accounts/${foundAccount.id}`, {
        method: "PUT",
        body: JSON.stringify(foundAccount),
      });
    });
});

historyClearBtn.addEventListener("click", () => {
  account.history = [];
  fetch(`http://localhost:3000/accounts/${accountId}`, {
    method: "PUT",
    body: JSON.stringify(account),
  });
  renderHistoryList([]);
});
