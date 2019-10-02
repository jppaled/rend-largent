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

function descSort(a, b) {
    return b - a;
}

function rendLargent(price, money) {
    if(isNaN(price) || price < 0) {
        console.log('invalid price')
    } else if(isNaN(money) || money < 0) {
        console.log('invalid money')
    } else if(money < price) {
        console.log('not enough money');
    } else {
        let change = money - price;

        if(change === 0) {
            console.log('nothing to give back!');
        } else {
            console.log(changeDetailCalculation(change));
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

rendLargent("1.75", "10");