import { Compass, Menu } from "lucide-react";

export default function Navbar({ onMenu }) {
  return (
    <header className="topbar">
      <a className="wordmark" href="#top">
        <span className="mark">
          <Compass size={17} />
        </span>{" "}
        NOMADE
      </a>
      <nav className="nav-links">
        <a href="#destinations">Destinations</a>
        <a href="#atlas">Cultural atlas</a>
        <a href="#about">About</a>
      </nav>
      <button
        className="menu-button"
        onClick={onMenu}
        aria-label="Toggle navigation"
      >
        <Menu />
      </button>
    </header>
  );
}
