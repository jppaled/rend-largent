# rend-largent
gives details of the change. [Demo](https://jppaled.github.io/rend-largent/)

```javascript
// currencies possibility in €
const currencies = [
    "500.00",
    "200.00",
    "100.00",
    "50.00",
    "20.00",
    "10.00",
    "5.00",
    "2.00",
    "1.00",
    "0.50",
    "0.20",
    "0.10",
    "0.05",
    "0.02",
    "0.01"
];

// count of given back change
let changeDetail = {
    "500.00": 0,
    "200.00": 0,
    "100.00": 0,
    "50.00": 0,
    "20.00": 0,
    "10.00": 0,
    "5.00": 0,
    "2.00": 0,
    "1.00": 0,
    "0.50": 0,
    "0.20": 0,
    "0.10": 0,
    "0.05": 0,
    "0.02": 0,
    "0.01": 0
};

const error = document.getElementById('error');
const ul = document.getElementById('changeDetail');
const totalChange = document.getElementById('totalChange');

const priceInput = document.getElementById("price");
const moneyInput = document.getElementById("money");

function descSort(a, b) {
    return b - a;
}

function reset() {
    for (detail in changeDetail) {
        changeDetail[detail] = 0;
    }
	
    ul.innerHTML = "";
    totalChange.innerHTML = "";
    error.innerHTML = "";
}

function searchBestReturn(change) {
    let currenciesSorted = currencies.sort(descSort);

    for (let i = 0; i < currenciesSorted.length; i++) {
        currency = Number(currenciesSorted[i]);
        
        if (change >= currency) {
            return currency;
        }
    }

    return false;
}

function changeDetailCalculation(change) {
    while (change > 0.00) {
        let bestReturn = searchBestReturn(change);
        
        change = (change - bestReturn).toFixed(2);
        
        let changeDetailKey = bestReturn.toFixed(2).toString();
        changeDetail[changeDetailKey]++;
    }

    // clean changeDetail array
    for (currency in changeDetail) {
        if (changeDetail[currency] === 0) {
            delete changeDetail[currency];
        }
    }

    return changeDetail;
}

function render(changeDetail, change) {
    totalChange.innerHTML += "Total change: "+ change;

    for (currency in changeDetail) {
        ul.innerHTML += "<li>" + currency +" € x " + changeDetail[currency] + "</li>";
    }
}

function main() {
    reset();

    if (priceInput.checkValidity() && moneyInput.checkValidity()) {
        let price = Number(priceInput.value);
        let money = Number(moneyInput.value);
        
        if (isNaN(price) || price < 0) {
            error.innerHTML = "invalid price";
        } else if (isNaN(money) || money < 0) {
            error.innerHTML = "invalid money";
        } else if (money < price) {
            error.innerHTML = "not enough money";
        } else {
            let change = Number(money - price).toFixed(2);
        
            if (change === 0.00) {
                error.innerHTML = "nothing to give back!";
            } else {
                let result = changeDetailCalculation(change);

                render(result, change);
            }
        }
    }
}
```
