export default function DestinationDetail({ destination, children }) {
  return (
    <section
      id="atlas"
      className="atlas-layout"
      aria-label={`${destination.name} cultural dashboard`}
    >
      {children}
    </section>
  );
}
