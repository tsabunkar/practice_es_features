//EUR (Euro) -> INDIAN (INR)
//1 EUR is worth 80 CAD, YOu can spend these in the following countries

const axios = require('axios');

//will return integer (currency converted rate)
const getExchangeRate = (from, to) => {//from will be only 'EUR' bcoz this currency is free for trail , other currency we need to pay :)

    return axios.get(`http://data.fixer.io/api/latest?access_key=fef44357f181d4cf682f49d4549cbaf1&format=1`)
        .then((response) => {
            // console.log(response.data.rates);
            return response.data.rates[to]
        }).catch((err) => {
            return err
        });
}

const getCountriesDetails = (currencyCode) => { //will return array
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`)
        .then((response) => {//this response is an array
            // console.log(response.data);
            return response.data.map((element) => {
                return element.name //give the country Name
            })

        }).catch((err) => {
            return err;
        });
}

const convertCurrency = (from, to, amount) => {
    let tempListOfCountries;
    return getCountriesDetails(to)
        .then((listOfCountries) => {
            tempListOfCountries = listOfCountries;
            return getExchangeRate(from, to)
        })
        .then((rate) => { //getExchangeRate() returns 1 EUR to ____(country specified) [ex- 1 EUR <=> 80 INR ]
            let exchangedAmount = amount * rate;
            return `${amount} ${from} is worth ${exchangedAmount} ${to}, Note : ${to} can also be used in the following countries : ${tempListOfCountries.join(', ')}`
        })
        .catch((err) => {
            return err;
        });
}



//Above we did using Promise chaining, but let do the same implementation using async-await

const convertCurrencyUsingAsyncAwait = async (from, to, amount) => {
    let listOfCountriesArr = await getCountriesDetails(to);
    let currencyConvertedRate = await getExchangeRate(from, to);

    let exchangedAmount = amount * currencyConvertedRate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}, Note : ${to} can also be used in the following countries : ${listOfCountriesArr.join(', ')}`

}



/* getExchangeRate('EUR', 'INR').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
}); */

/* getCountriesDetails('INR').then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
}); */



convertCurrency('EUR', 'INR', 12).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});


convertCurrencyUsingAsyncAwait('EUR', 'INR', 12).then((result) => {
    console.log(result);
}).catch((err) => {
    console.log(err);
});


