# rend-largent
gives details of the change. [Demo](https://jppaled.github.io/rend-largent/)

```javascript
const currencies = [
    "500",
    "200",
    "100",
    "50",
    "20",
    "10",
    "5",
    "2",
    "1",
    "0.50",
    "0.20",
    "0.10",
    "0.05",
    "0.02",
    "0.01"
];

const changeDetail = {
    "500": 0,
    "200": 0,
    "100": 0,
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "2": 0,
    "1": 0,
    "0.50": 0,
    "0.20": 0,
    "0.10": 0,
    "0.05": 0,
    "0.02": 0,
    "0.01": 0
};
const error = document.getElementById('error');
const ul = document.getElementById('change');

const priceInput = document.getElementById("price");
const moneyInput = document.getElementById("money");

function descSort(a, b) {
    return b - a;
}

function rendLargent(price, money) {
    if(isNaN(price) || price < 0) {
        error.innerHTML = "invalid price";
    } else if(isNaN(money) || money < 0) {
        error.innerHTML = "invalid money";
    } else if(money < price) {
        error.innerHTML = "not enough money";
    } else {
        let change = money - price;

        if(change === 0) {
            error.innerHTML = "nothing to give back!";
        } else {
           let aled = changeDetailCalculation(change);

           render(aled);
        }
    }
}

function changeDetailCalculation(change) {
    while (change !== "0.00") {
        currencies.sort(descSort).forEach(currency => {
            if (change >= currency) {
                change = (change - currency).toFixed(2);

                changeDetail[currency.toString()]++
            }
        })
    }

    for (currency in changeDetail) {
        if(changeDetail[currency] === 0) {
            delete changeDetail[currency];
        }
    }

    return changeDetail;
}

function render(changeDetail) {
    for (currency in changeDetail) {
        ul.innerHTML += "<li>" + currency +" € x " + changeDetail[currency] + "</li>";
    }
}

function reset() {
    for(detail in changeDetail) {
        changeDetail[detail] = 0;
    }

    ul.innerHTML = "";
    error.innerHTML = "";
}

function main() {
    reset();

    if(priceInput.checkValidity() && moneyInput.checkValidity()) {
        rendLargent(priceInput.value, moneyInput.value);
    }
}
```
