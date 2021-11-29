import DeleteButton from "./DeleteButton";

export default function ConverterOutput({
  toCurr,
  onToCurrencyChangeHandler,
  index,
  currencyList,
  exchangeRates,
  amount,
  onDeleteToCurr
}) {
  return (
    <div className="input-box">
      <select
        name="toCurrency"
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

      <div>{(exchangeRates && exchangeRates[toCurr] * amount).toFixed(2)}</div>

      {index > 0 && (
        <DeleteButton onClick={() => onDeleteToCurr(index)} size="small" />
      )}
    </div>
  );
}
