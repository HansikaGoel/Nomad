import { ArrowUpRight } from "lucide-react";

export default function CultureCard({
  number,
  title,
  detail,
  imageUrl,
  onClick,
}) {
  return (
    <button
      className="destination-card"
      onClick={onClick}
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,.88) 12%, rgba(0,0,0,.18) 100%), url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "260px",
        color: "#fff",
      }}
    >
      <span className="card-number">{number}</span>
      <strong style={{ color: "#fff" }}>{title}</strong>
      <span style={{ color: "#d1d5db" }}>{detail}</span>
      <ArrowUpRight size={17} />
    </button>
  );
}
