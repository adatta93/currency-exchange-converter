import { useEffect, useState } from "react";
import "./styles.css";
import getData from "./AppService";
import ConverterInput from "./ConverterInput";
import ConverterOutput from "./ConverterOutput";
import AddButton from "./AddButton";
import useLocalStorageState from "./useLocalStorageState";

export default function Converter({ row }) {
  const [currencyList, setCurrencyList] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useLocalStorageState(
    { USD: 1 },
    "exchangeRates" + row
  );
  const [toCurrency, setToCurrency] = useLocalStorageState(
    ["USD"],
    "toCurrency" + row
  );
  const [amount, setAmount] = useLocalStorageState(1, "amount" + row);

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
      setCurrencyList(data.sort());
    };
    loadCurrencyList();
  }, []);

  const getRate = async (toCurr) => {
    let response = await getData(
      `https://currency-exchange.p.rapidapi.com/exchange?from=${fromCurrency}&to=${toCurr}`
    );
    let data = await response.json();
    console.log("Exchange Rate " + data);
    setExchangeRates((prev) => {
      console.log(prev);
      return { ...prev, [toCurr]: data };
    });
  };

  const addToCurrency = () => {
    setToCurrency((prev) => [...prev, "USD"]);
    setExchangeRates((prev) => {
      return { ...prev, USD: 1 };
    });
  };

  const onToCurrencyChangeHandler = (ev, index, oldCurr) => {
    let newCurr = ev.target.value;
    setToCurrency((prev) => {
      prev[index] = newCurr;
      return [...prev];
    });
    setExchangeRates((prev) => {
      prev[oldCurr] = prev[newCurr];
      delete prev[oldCurr];
      return { ...prev, [newCurr]: 1 };
    });
    getRate(newCurr);
  };

  const onDeleteToCurr = (index) => {
    setToCurrency(toCurrency.filter((toCurr, i) => i !== index));
  };

  return (
    <div className="converter">
      <div className="row">
        <div className="">
          <ConverterInput
            fromCurrency={fromCurrency}
            setFromCurrency={setFromCurrency}
            currencyList={currencyList}
            amount={amount}
            setAmount={setAmount}
          />
        </div>

        <svg
          className="arrow-icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>

        <div className="to-currency">
          {toCurrency.map((toCurr, index) => (
            <ConverterOutput
              key={index}
              toCurr={toCurr}
              onToCurrencyChangeHandler={onToCurrencyChangeHandler}
              index={index}
              currencyList={currencyList}
              exchangeRates={exchangeRates}
              amount={amount}
              onDeleteToCurr={(index) => onDeleteToCurr(index)}
            />
          ))}
        </div>

        <AddButton disabled={toCurrency.length === 4} onClick={addToCurrency} />
      </div>
    </div>
  );
}
