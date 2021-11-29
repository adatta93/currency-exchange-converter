import Converter from "./Converter";
import DeleteButton from "./DeleteButton";

export default function ConverterList({ converterList, onDeleteConverter }) {
  return (
    <div className="converter-list">
      {converterList.map((c) => (
        <div className="converter-list-item" key={c}>
          {c > 1 ? (
            <DeleteButton onClick={() => onDeleteConverter(c)} />
          ) : (
            <div className="empty-delete-button"></div>
          )}
          <Converter row={c} />
        </div>
      ))}
    </div>
  );
}
