export let accounts = [
  {
    email: "amin@gmail.com",
    password: "123321",
    balance: 10000,
    name: "Amin Aliosmanov",
    profileUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH1xbJpEpbwEsp4SsFULetPAqG26gtYb0kJg&s",
    accountNumber: "1234 5678 1234 5678",
    cvv: "123",
    expiryDate: new Date(),
    history: [
      {
        date: new Date(),
        amount: 10,
        to: "",
        from: "Scholarship",
      },
      {
        date: new Date(),
        amount: -10,
        to: "Mc Donald's",
        from: "",
      },
    ],
    cashback: 0,
  },
  {
    email: "cavidan@yahoo.com",
    password: "321123",
    balance: 1000,
    name: "Cavidan Ibrahimov",
    profileUrl: "",
    accountNumber: "1234 5678 1234 1234",
    cvv: "123",
    expiryDate: new Date(),
    history: [
      {
        date: new Date(),
        amount: 10,
        to: "",
        from: "Scholarship",
      },
      {
        date: new Date(),
        amount: -10,
        to: "Mc Donald's",
        from: "",
      },
    ],
    cashback: 0,
  },
  {
    email: "polad@mail.ru",
    password: "312231",
    balance: 1000,
    name: "Polad Mammadli",
    profileUrl: "",
    accountNumber: "1234 5678 5678 1234",
    date: new Date(),
    history: [
      {
        date: new Date(),
        amount: 10,
        to: "",
        from: "Scholarship",
      },
      {
        date: new Date(),
        amount: -10,
        to: "Mc Donald's",
        from: "",
      },
    ],
    cashback: 0,
  },
];
