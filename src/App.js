import AddButton from "./AddButton";
import ConverterList from "./ConverterList";
import useLocalStorageState from "./useLocalStorageState";

export default function App() {
  const [converterList, setConverterList] = useLocalStorageState(
    [1],
    "converterList"
  );

  const onAddConverter = () => {
    setConverterList((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  const onDeleteConverter = (item) => {
    setConverterList(converterList.filter((c) => c !== item));

    // remove localStorage values for this converter row
    localStorage.removeItem("exchangeRates" + item);
    localStorage.removeItem("toCurrency" + item);
    localStorage.removeItem("amount" + item);
  };

  return (
    <div className="App">
      <h1 className="app-title">Currency Converter</h1>
      <div className="row">
        <div className="empty-delete-button"></div>
        <div className="col-from">FROM</div>
        <div className="col-to">TO</div>
      </div>

      <ConverterList
        converterList={converterList}
        onDeleteConverter={(item) => onDeleteConverter(item)}
      />

      <div className="row">
        <div className="empty-delete-button"></div>
        <AddButton onClick={onAddConverter} />
      </div>
    </div>
  );
}
