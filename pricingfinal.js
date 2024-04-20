// Last Updated 20 April 24

let continentInitial = getCookie("continentCode");
let regime = "annual";
let quaterlyPercentageChange = 1.1;
let rCEuros = 5000 * 0.92;
let rCDollars = 5000;
let numberofusers, numberofviewonly;
let totalmonthlypremium, totalmonthlysupreme;
let discountPremiumValue, discountSupremeValue;
let discountPremiumInPercent, discountSupremeInPercent;

let dataPricingToggle = document.querySelector("[data-pricing='toggle']");
let dataPricingAnnual = dataPricingToggle.querySelector(
  "[data-pricing='annual']",
);
let dataPricingQuaterly = dataPricingToggle.querySelector(
  "[data-pricing='quaterly']",
);
function getCookie(name) {
  let cookieArray = document.cookie.split(";"); // Split the cookie string into an array
  let cookieName = `${name}=`; // Create the cookie name string with an equal sign
  for (let cookie of cookieArray) {
    cookie = cookie.trim(); // Trim whitespace from the cookie string
    if (cookie.startsWith(cookieName)) {
      return cookie.substring(cookieName.length, cookie.length); // Extract and return the cookie value
    }
  }
  return ""; // Return empty string if the cookie was not found
}
let currencySelected;
let dataCurrency = document.querySelector("[data-pricing='currency']");
let inputUserOnly = document.querySelector('[data-pr="inputusers"]');
let inputViewOnly = document.querySelector('[data-pr="inputviewonly"]');
if (continentInitial === "EU") {
  // set things based on EUROS
  currencySelected = "€";
  dataCurrency.textContent = `Switch to $`;
} else {
  // set things based on DOLLARS
  currencySelected = "$";
  dataCurrency.textContent = `Switch to €`;
}
function checkCurrency() {
  if (currencySelected === "€") {
    currencySelected = "$";
    dataCurrency.textContent = `Switch to €`;
    console.log(` the current Value selected ${currencySelected}`);
  } else {
    currencySelected = "€";
    dataCurrency.textContent = `Switch to $`;
    console.log(`the current Value selected ${currencySelected}`);
  }
}
function regimeUpdate() {
  if (regime === "annual") {
    regime = "quaterly";
    console.log(regime);
  }
  if (regime === "quaterly") {
    regime = "annual";
    console.log(regime);
  }
}
function calculateFinalDiscount(value) {
  if (value < 2500) {
    return 0;
  } else if (value < 10000) {
    return 10;
  } else if (value < 25000) {
    return 20;
  } else if (value < 50000) {
    return 40;
  } else if (value < 75000) {
    return 50;
  } else {
    return 60;
  }
}
function internationalUpToTwoDecimals(arg) {
  // Round the number to two decimal places and convert back to float to remove trailing zeros
  const rounded = parseFloat(Number(arg).toFixed(2));

  // Convert to a localized string with options to control fraction digits dynamically
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
function internationalZeroDecimal(arg) {
  // Round the number to the nearest integer and convert back to float to remove any decimals
  const rounded = parseFloat(Number(arg).toFixed(0));

  // Convert to a localized string without displaying any decimals
  return rounded.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

// console.log(`Default Regime ${regime}`);
// console.log(`Default Currency Selected ${currencySelected}`);

const panels = {
  displayPricing: {
    premiumUsers: document.querySelectorAll(
      '[data-pr="display-premium-pricing-users"]',
    ),
    supremeUsers: document.querySelectorAll(
      '[data-pr="display-supreme-pricing-users"]',
    ),
    supremeView: document.querySelectorAll(
      '[data-pr="display-supreme-pricing-view"]',
    ),
  },
  totalMonthly: {
    premium: document.querySelector(
      '[data-pr="display-premium-total-monthly"]',
    ),
    supreme: document.querySelector(
      '[data-pr="display-supreme-total-monthly"]',
    ),
  },
  yourMonthly: {
    premium: document.querySelector('[data-pr="display-premium-your-monthly"]'),
    supreme: document.querySelector('[data-pr="display-supreme-your-monthly"]'),
  },
  perEmployee: {
    premium: document.querySelector('[data-pr="display-premium-per-employee"]'),
    supreme: document.querySelector('[data-pr="display-supreme-per-employee"]'),
  },
  totalInvestment: {
    premium: document.querySelector('[data-pr="display-premium-total-inv"]'),
    supreme: document.querySelector('[data-pr="display-supreme-total-inv"]'),
  },
  roiPerYear: {
    premium: document.querySelector('[data-pr="display-premium-roi-py"]'),
    supreme: document.querySelector('[data-pr="display-supreme-roi-py"]'),
  },
  roiMultiple: {
    premium: document.querySelector('[data-pr="display-premium-roi-multiple"]'),
    supreme: document.querySelector('[data-pr="display-supreme-roi-multiple"]'),
  },
  discount: {
    premium: document.querySelector('[data-pr="discountpremium"]'),
    supreme: document.querySelector('[data-pr="discountsupreme"]'),
  },
};

// Function to retrieve and parse numeric data from DOM elements
function getNumericValue(selector) {
  const elementText = document.querySelector(
    `[data-pr="${selector}"]`,
  ).textContent;
  return Number(elementText);
}

// Structured data object for currency rates
const currencyRates = {
  euros: {
    annualPremiumUsers: getNumericValue("euros-annual-premium-users"),
    annualSupremeUsers: getNumericValue("euros-annual-supreme-users"),
    annualSupremeViews: getNumericValue("euros-annual-supreme-view"),
  },
  dollars: {
    annualPremiumUsers: getNumericValue("dollar-annual-premium-users"),
    annualSupremeUsers: getNumericValue("dollar-annual-supreme-users"),
    annualSupremeViews: getNumericValue("dollar-annual-supreme-view"),
  },
};

function calculations(preUser, supUser, supView, rC) {
  updateCurrencyIconOnly();
  numberofusers = Number(inputUserOnly.value);
  numberofviewonly = Number(inputViewOnly.value);

  panels.displayPricing.premiumUsers.forEach((e) => {
    e.textContent = `${currencySelected}${preUser}`;
  });
  panels.displayPricing.supremeUsers.forEach((e) => {
    e.textContent = `${currencySelected}${supUser}`;
  });
  panels.displayPricing.supremeView.forEach((e) => {
    e.textContent = `${currencySelected}${supView}`;
  });

  totalmonthlypremium = numberofusers * preUser;
  totalmonthlysupreme = numberofusers * supUser + numberofviewonly * supView;
  panels.totalMonthly.premium.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlypremium)}`;
  panels.totalMonthly.supreme.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlysupreme)}`;
  discountPremiumValue = calculateFinalDiscount(totalmonthlypremium);
  discountSupremeValue = calculateFinalDiscount(totalmonthlysupreme);
  panels.discount.premium.textContent = `${discountPremiumValue}`;
  panels.discount.supreme.textContent = `${discountSupremeValue}`;
  discountPremiumInPercent = (100 - discountPremiumValue) * 0.01;
  discountSupremeInPercent = (100 - discountSupremeValue) * 0.01;
  panels.yourMonthly.premium.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlypremium * discountPremiumInPercent)}`;
  panels.yourMonthly.supreme.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlysupreme * discountSupremeInPercent)}`;
  panels.perEmployee.premium.textContent = `${currencySelected}${internationalUpToTwoDecimals(Number(totalmonthlypremium * discountPremiumInPercent) / numberofusers)}`;
  panels.perEmployee.supreme.textContent = `${currencySelected}${internationalUpToTwoDecimals(Number(totalmonthlysupreme * discountSupremeInPercent) / (numberofusers + numberofviewonly))}`;
  panels.totalInvestment.premium.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlypremium * discountPremiumInPercent * 12)}`;
  panels.totalInvestment.supreme.textContent = `${currencySelected}${internationalZeroDecimal(totalmonthlysupreme * discountSupremeInPercent * 12)}`;
  panels.roiPerYear.premium.textContent = `${currencySelected}${internationalZeroDecimal(rC * numberofusers)}`;
  panels.roiPerYear.supreme.textContent = `${currencySelected}${internationalZeroDecimal(rC * (numberofusers + numberofviewonly))}`;
  panels.roiMultiple.premium.textContent = `${Math.round((rC * numberofusers) / (totalmonthlypremium * discountPremiumInPercent * 12))}`;
  panels.roiMultiple.supreme.textContent = `${Math.round((rC * (numberofusers + numberofviewonly)) / (totalmonthlysupreme * discountSupremeInPercent * 12))}`;
}

dataCurrency.addEventListener("click", () => {
  checkCurrency();
  roiLogicFinal();
});

dataPricingQuaterly.addEventListener("click", () => {
  regime = "quaterly";
  console.log(regime);
  dataPricingQuaterly.classList.add("is--active");
  dataPricingAnnual.classList.remove("is--active");
  roiLogicFinal();
});

dataPricingAnnual.addEventListener("click", () => {
  regime = "annual";
  console.log(regime);
  dataPricingAnnual.classList.add("is--active");
  dataPricingQuaterly.classList.remove("is--active");
  roiLogicFinal();
});

// Select the value of Initial discount
let discountOffered = Number(
  document.querySelector('[data-pr="discount"]').textContent,
);

// Select the value of CurrencyIcon discount
let currencyIcon = document.querySelectorAll("[data-pr='currencysymbol']");

function updateCurrencyIconOnly() {
  currencyIcon.forEach((i) => (i.textContent = `${currencySelected}`));
}

function roiLogicFinal() {
  if (currencySelected === "$" && regime === "annual") {
    calculations(
      currencyRates.dollars.annualPremiumUsers,
      currencyRates.dollars.annualSupremeUsers,
      currencyRates.dollars.annualSupremeViews,
      rCDollars,
    );
    // console.log(`We have to run code with Dollar Values and for Annual Regime`);
  }
  if (currencySelected === "$" && regime === "quaterly") {
    // console.log(
    //   `We have to run code with Dollar Values and for Quaterly Regime`,
    // );
    calculations(
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualPremiumUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualSupremeUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.dollars.annualSupremeViews,
      ),
      rCDollars,
    );
  }
  if (currencySelected === "€" && regime === "annual") {
    calculations(
      currencyRates.euros.annualPremiumUsers,
      currencyRates.euros.annualSupremeUsers,
      currencyRates.euros.annualSupremeViews,
      rCEuros,
    );
    // console.log(`We have to run code with Euros Values and for Annual Regime`);
  }

  if (currencySelected === "€" && regime === "quaterly") {
    calculations(
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualPremiumUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualSupremeUsers,
      ),
      internationalUpToTwoDecimals(
        quaterlyPercentageChange * currencyRates.euros.annualSupremeViews,
      ),
      rCEuros,
    );
    // console.log(
    //   `We have to run code with Euros Values and for Quaterly Regime`,
    // );
  }
}

roiLogicFinal();

inputUserOnly.addEventListener("input", roiLogicFinal);
inputViewOnly.addEventListener("input", roiLogicFinal);
