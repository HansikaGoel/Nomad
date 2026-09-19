export default function ComparisonTable({ rows }) {
  return (
    <div className="compare-table">
      {rows.map((row) => (
        <div className="compare-row" key={row[0]}>
          {row.map((cell, index) => (
            <div className={index === 0 ? "compare-label" : ""} key={cell}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
