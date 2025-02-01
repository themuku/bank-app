import validator from "validator";
import { toast } from "./main";
import dayjs from "dayjs";

const signupBtn = document.querySelector(".signup-btn");
console.log(signupBtn);

const email = document.getElementById("email").value;
const password = document.getElementById("pass").value;
const birthdate = document.getElementById("birthdate").value;
const phoneNumber = document.getElementById("phone-number").value;
const finCode = document.getElementById("fin-code").value;

function isFinCode(fin) {
  const specials = "!@#$%^&*()?/,.}{][";
  if (fin.length === 8) {
    for (const c of specials) {
      if (fin.includes(c)) {
        return false;
      }
    }
    return true;
  } else {
    return false;
  }
}

function generateRandomAccountNumber() {
  let accountNumber = "";

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 9; j++) {
      accountNumber += Math.floor(Math.random() * j);
    }

    accountNumber += " ";
  }

  return accountNumber;
}

signupBtn.addEventListener("click", (event) => {
  // if (
  //   !validator.isEmail(email) &&
  //   !validator.isStrongPassword(password) &&
  //   !validator.isDate(birthdate) &&
  //   !validator.isMobilePhone(phoneNumber, "az-AZ") &&
  //   !isFinCode(finCode)
  // ) {
  //   toast(true, true, "Enter correct fields");
  //   return;
  // }
  console.log("salam");

  // fetch("http://localhost:3000/accounts")
  //   .then((res) => res.json())
  //   .then((accounts) => {
  //     const foundAccount = accounts.find((acc) => acc.email === email);

  //     if (foundAccount) {
  //       toast(true, true, "This email already exists");
  //       return;
  //     }

  //     const randomAccountNumber = generateRandomAccountNumber();
  //     const newUser = {
  //       email,
  //       password,
  //       phoneNumber,
  //       birthdate,
  //       finCode,
  //       history: [],
  //       expiryDate: new Date(new Date().getFullYear() + 5),
  //       cashback: 0,
  //       balance: 0,
  //       name: email.split("@")[0],
  //       profileUrl: "",
  //       accountNumber: randomAccountNumber,
  //     };

  //     console.log(
  //       fetch("http://localhost:3000/accounts", {
  //         method: "POST",
  //         body: JSON.stringify(newUser),
  //       }),
  //       newUser
  //     );
  //   });
});
