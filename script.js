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
      const selectedCurrency = showAvaliableCurrency();
      const sum = getAmountFromUser();
      const IsAvailable = checkAvailableBalance(sum, selectedCurrency);
      IsAccess(IsAvailable, selectedCurrency, sum);
      return Promise.reject();
    }
  )
  .then(function (currency) {
    showBalance(currency);
  })
  .finally(function () {
    alert("Дякую, гарного дня 😊");
  })
  .catch(function () {});

function isUserAgree() {
  return confirm("Подивитися баланс карті?");
}

function selectCurrency() {
  let currencyFromUserData = "";
  for (key in userData) {
    currencyFromUserData += `${String(key)},`;
  }
  const currencies = currencyFromUserData.slice(0, -1);

  const text = "Введіть валюту за якою буде виведено баланс, можливі валюти:";
  const selectedCurrency = getCurrencyFromUser(currencies, text);

  return selectedCurrency;
}

function showBalance(currency) {
  alert(`Баланс становить: ${userData[currency]} ${currency}`);
}

function getCurrencyFromUser(currencies, textInPrompt) {
  let selectedCurrency = "";
  do {
    selectedCurrency = prompt(`${textInPrompt} ${currencies}`, "");
  } while (!currencies.includes(selectedCurrency) || selectedCurrency == "");

  return selectedCurrency;
}

function getAmountFromUser() {
  let sum = 0;
  do {
    sum = +prompt(`Сума зняття`, "");
  } while (isNaN(sum) || sum == "");

  return sum;
}

function showAvaliableCurrency() {
  let avaliableCurrency = "";
  for (key in userData) {
    for (key2 in bankData) {
      if (key === key2) {
        if (bankData[key2]["max"] !== 0) {
          avaliableCurrency += `${String(key)},`;
        }
      }
    }
  }
  const newAvaliableCurrencies = avaliableCurrency.slice(0, -1);

  const text = "Введіть валюту за якою буде списано готівку, можливі валюти:";
  const selectedCurrency = getCurrencyFromUser(newAvaliableCurrencies, text);

  return selectedCurrency;
}

function checkAvailableBalance(amount, currency) {
  let IsUserDataBalance = false;
  let IsMaxLimit = false;
  let IsMinLimit = false;

  if (amount <= userData[currency]) {
    IsUserDataBalance = true;
    if (amount <= bankData[currency]["max"]) {
      IsMaxLimit = true;
    } else {
      alert(
        `Доступна сума банку більша за доступну. Максимальна сума зняття: ${bankData[currency]["max"]}`
      );
    }
    if (amount >= bankData[currency]["min"]) {
      IsMinLimit = true;
    } else {
      alert(
        `Мінімальна сума банку менша за доступну. Мінімальна сума зняття: ${bankData[currency]["min"]}`
      );
    }
  } else {
    alert(
      `Введена сума користувача більша за доступну. Максимальна сума зняття: ${userData[currency]}`
    );
  }

  if (
    IsUserDataBalance === true &&
    IsMaxLimit === true &&
    IsMinLimit === true
  ) {
    return true;
  }
  return false;
}

function IsAccess(IsAvailable, currency, amount) {
  IsAvailable
    ? alert(`От Ваші гроші ${amount} ${currency} ${bankData[currency]["img"]}`)
    : "";
}
