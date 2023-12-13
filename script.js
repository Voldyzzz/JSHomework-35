const userData = {
  USD: 1000,
  EUR: 900,
  UAH: 15000,
  BIF: 20000,
  AOA: 100,
};

const bankData = {
  USD: {
    max: 3000,
    min: 100,
    img: "💵",
  },
  EUR: {
    max: 1000,
    min: 50,
    img: "💶",
  },
  UAH: {
    max: 0,
    min: 0,
    img: "💴",
  },
  GBP: {
    max: 10000,
    min: 100,
    img: "💷",
  },
};

const getMoney = new Promise(function (resolve, reject) {
  const isAgree = isUserAgree();
  isAgree ? resolve(isAgree) : reject(isAgree);
});

getMoney
  .then(
    function () {
      return selectCurrency();
    },
    function () {
      return Promise.reject();
    }
  )
  .then(
    function (currency) {
      showBalance(currency);
    },
    function () {}
  );

function isUserAgree() {
  return confirm("Подивитися баланс карті?");
}

function selectCurrency() {
  let currencyFromUserData = "";
  for (key in userData) {
    currencyFromUserData += `${String(key)},`;
  }
  const newstr = currencyFromUserData.slice(0, -1);

  let selectedCurrency = "";
  do {
    selectedCurrency = prompt(
      `Введіть валюту за якою буде виведено баланс, можливі валюти: ${newstr}`,
      ""
    );
  } while (!newstr.includes(selectedCurrency) || selectedCurrency == "");

  return selectedCurrency;
}

function showBalance(currency) {
  alert(`Баланс становить: ${userData[currency]} ${currency}`);
}
