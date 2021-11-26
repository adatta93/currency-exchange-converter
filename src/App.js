import { useEffect, useState } from "react";
import "./styles.css";
import getData from "./AppService";

export default function App() {
  const [currencyList, setCurrencyList] = useState(null);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState(["INR"]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    let loadCurrencyList = async () => {
      /* let response = await getData(
        "https://currency-exchange.p.rapidapi.com/listquotes"
      );
      let data = await response.json(); */
      let data = [
        "SGD",
        "MYR",
        "EUR",
        "USD",
        "AUD",
        "JPY",
        "CNH",
        "HKD",
        "CAD",
        "INR",
        "DKK",
        "GBP",
        "RUB",
        "NZD",
        "MXN",
        "IDR",
        "TWD",
        "THB",
        "VND"
      ];
      console.log("Cur " + data);
      setCurrencyList(data.sort());
    };
    loadCurrencyList();
  }, []);

  useEffect(() => {
    for (let toCurr of toCurrency) {
      if (toCurr) getRate(toCurr);
    }
  }, [fromCurrency]);

  const getRate = async (toCurr) => {
    let response = await getData(
      `https://currency-exchange.p.rapidapi.com/exchange?from=${fromCurrency}&to=${toCurr}`
    );
    let data = await response.json();
    console.log("Exc " + data);
    setExchangeRates((prev) => {
      console.log(prev);
      return { ...prev, [toCurr]: data };
    });
  };

  const addToCurrency = () => {
    setToCurrency((prev) => [...prev, "USD"]);
    setExchangeRates((prev) => {
      console.log(prev);
      return { ...prev, USD: 0 };
    });
  };

  const onToCurrencyChangeHandler = (ev, index, oldCurr) => {
    let newCurr = ev.target.value;
    setToCurrency((prev) => {
      console.log(prev, index);
      prev[index] = newCurr;
      return [...prev];
    });
    setExchangeRates((prev) => {
      console.log(newCurr, oldCurr);
      prev[oldCurr] = prev[newCurr];
      delete prev[oldCurr];
      return { ...prev, [newCurr]: 0 };
    });
    getRate(newCurr);
  };

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <input value={amount} onChange={(ev) => setAmount(ev.target.value)} />
      <select
        name="fromCurrency"
        value={fromCurrency}
        onChange={(ev) => setFromCurrency(ev.target.value)}
      >
        {currencyList &&
          currencyList.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
      </select>
      {toCurrency.map((toCurr, index) => (
        <select
          name="toCurrency"
          key={toCurr}
          value={toCurr}
          onChange={(ev) => onToCurrencyChangeHandler(ev, index, toCurr)}
        >
          <option value="">Select</option>
          {currencyList &&
            currencyList.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
        </select>
      ))}

      <button onClick={addToCurrency}>Add</button>
      <h2>
        exchange: {amount} {fromCurrency} ->
        {toCurrency &&
          toCurrency.map((toCurr) => (
            <div key={toCurr}>
              <h4>{toCurr}</h4>
              <h5>
                {exchangeRates && (exchangeRates[toCurr] * amount).toFixed(2)}
              </h5>
            </div>
          ))}
      </h2>
    </div>
  );
}
