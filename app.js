const fromAmountElement = document.querySelector('.amount');
const convertedAmountElement = document.querySelector('.convertedAmount');
const fromCurrencyElement = document.querySelector('.fromCurrency');
const toCurrencyElement = document.querySelector('.toCurrency');
const resultElement = document.querySelector('.result');

// array to populate the select tags with these countries
const countries = [
    { code: "USD", name: "United States Dollar" },
    { code: "PKR", name: "Pakistani Rupee" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound Sterling" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "NZD", name: "New Zealand Dollar" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "NOK", name: "Norwegian Krone" },
    { code: "KRW", name: "South Korean Won" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "BRL", name: "Brazilian Real" },
    { code: "RUB", name: "Russian Ruble" },
];

// Function to populate select elements
const populateSelect = (selectElement, currencyArray) => {
    currencyArray.forEach(country => {
        const option = document.createElement('option');
        option.value = country.code;
        option.textContent = `${country.code} (${country.name})`;
        selectElement.appendChild(option);
    });
};

// Call the function to populate the select elements
populateSelect(fromCurrencyElement, countries);
populateSelect(toCurrencyElement, countries);

// Set default values of select tags
fromCurrencyElement.value = "USD";
toCurrencyElement.value = "PKR";

// Function to get exchange rate using API
const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    try {
        // Fetching data from API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();

        const conversionRate = data.rates[toCurrency];
        const conversionAmount = amount * conversionRate;

        convertedAmountElement.value =  conversionAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${conversionAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error(error);
    }
};

// Add event listeners to trigger conversion
fromAmountElement.addEventListener('input', getExchangeRate);
fromCurrencyElement.addEventListener('change', getExchangeRate);
toCurrencyElement.addEventListener('change', getExchangeRate);

// Initial conversion on page load
window.addEventListener('load', getExchangeRate);





