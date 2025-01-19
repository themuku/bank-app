import validator from "validator";

const form = document.querySelector("form");

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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = event.target[0].value;
  const phoneNumber = event.target[1].value;
  const finCode = event.target[2].value;
  const birthDate = event.target[3].value;
  const password = event.target[4].value;
  if (
    validator.isEmail(email) &&
    validator.isStrongPassword(password) &&
    validator.isDate(birthDate) &&
    validator.isMobilePhone(phoneNumber, "az-AZ") &&
    isFinCode(finCode)
  ) {
    window.location = "login.html";
  }
});
