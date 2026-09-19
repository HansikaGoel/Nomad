import { ArrowDown, Globe2 } from "lucide-react";

export default function Hero({ destination, onExplore }) {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: `linear-gradient(90deg, rgba(16,34,31,.95), rgba(16,34,31,.28)), url(${destination.heroImage})`,
      }}
    >
      <div className="hero-copy">
        <p className="eyebrow">
          <Globe2 size={14} /> NOMADE / INDIAN HERITAGE ATLAS
        </p>
        <h1>
          Discover India's
          <br />
          <em>Living Heritage,</em>
          <br />
          Culture & Sacred Traditions
        </h1>
        <p className="hero-intro">
          Travel through temples, kitchens, instruments, textiles, and stories
          that remain part of everyday life.
        </p>
        <button className="primary-button" onClick={onExplore}>
          Explore the atlas <ArrowDown size={17} />
        </button>
      </div>
      <div className="hero-caption">
        <span>Currently exploring</span>
        <strong>
          {destination.name}, {destination.state}
        </strong>
        <small>India / living culture edition</small>
      </div>
    </section>
  );
}
