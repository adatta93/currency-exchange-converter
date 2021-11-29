export default function ConverterInput({
  fromCurrency,
  setFromCurrency,
  currencyList,
  amount,
  setAmount
}) {
  return (
    <div className="input-box">
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
      <input value={amount} onChange={(ev) => setAmount(ev.target.value)} />
    </div>
  );
}
