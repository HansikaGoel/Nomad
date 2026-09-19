import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Compass,
  Menu,
  Search,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { createReview, generateItinerary } from "./services/api";
import { INDIA_DESTINATIONS } from "./constants";
import LanguageTranslator from "./components/LanguageTranslator";

const tabs = [
  ["templesAndBeliefs", "01", "🛕 Temples, Stories & Beliefs"],
  ["foodAndCuisine", "02", "🍛 Food & Cuisine"],
  ["folkDanceAndMusic", "03", "💃 Folk Dance & Music"],
  ["folkArtAndAttire", "04", "🎨 Folk Art & Attire"],
  ["historyAndHeritage", "05", "📜 History & Heritage"],
  ["languages", "06", "🗣️ Languages & Etiquette"],
];

function App() {
  const [selectedDestination, setSelectedDestination] = useState(
    INDIA_DESTINATIONS[0],
  );
  const [activeTab, setActiveTab] = useState("templesAndBeliefs");
  const [query, setQuery] = useState("");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [itineraryPlan, setItineraryPlan] = useState(null);
  const matches = useMemo(
    () =>
      INDIA_DESTINATIONS.filter((item) =>
        `${item.name} ${item.state}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  function selectDestination(item) {
    setSelectedDestination(item);
    setActiveTab("templesAndBeliefs");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function itinerary() {
    const localPlan = {
      title: `3 Days of Heritage in ${selectedDestination.name}`,
      steps: [
        `Day 1: Visit ${selectedDestination.templesAndBeliefs[0].name} and learn its living story.`,
        `Day 2: Taste ${selectedDestination.foodAndCuisine[0].dishName}, then follow the ${selectedDestination.foodAndCuisine[0].vendorTrail}.`,
        `Day 3: Experience ${selectedDestination.folkDanceAndMusic[0].formName} and explore ${selectedDestination.folkArtAndAttire[0].artName}.`,
      ],
    };
    try {
      const result = await generateItinerary(
        selectedDestination.id,
        3,
        "heritage",
      );
      setItineraryPlan({
        title: localPlan.title,
        steps: result.itinerary.map(
          (item) => `Day ${item.day}: ${item.activity}`,
        ),
      });
    } catch {
      setItineraryPlan(localPlan);
    }
  }

  return (
    <div className="app-shell">
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
        <button className="menu-button" aria-label="Menu">
          <Menu />
        </button>
        <button
          className="saved-button"
          onClick={() =>
            setNotice("Your Indian heritage atlas is saved locally.")
          }
        >
          Saved journeys <span>14</span>
        </button>
      </header>
      <main id="top">
        <section
          className="hero"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(16,34,31,.96), rgba(16,34,31,.25)), url(${selectedDestination.heroImage})`,
          }}
        >
          <div className="hero-copy">
            <p className="eyebrow">NOMADE / INDIAN HERITAGE ATLAS</p>
            <h1>
              Discover India's
              <br />
              <em>Living Heritage,</em>
              <br />
              Culture & Sacred Traditions
            </h1>
            <p className="hero-intro">
              A visual field guide to temples, kitchens, music, craft, and
              stories that remain part of everyday life.
            </p>
            <a className="primary-button" href="#atlas">
              Explore {selectedDestination.name} <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-caption">
            <span>Currently exploring</span>
            <strong>
              {selectedDestination.name}, {selectedDestination.state}
            </strong>
            <small>India / living culture edition</small>
          </div>
        </section>
        <section className="destination-strip" id="destinations">
          <div>
            <p className="eyebrow">INDIA’S ICONIC HERITAGE HUBS</p>
            <h2>
              Fourteen ways
              <br />
              into a living country.
            </h2>
          </div>
          <div>
            <label className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search city or state..."
                aria-label="Search Indian destinations"
              />
            </label>
            <div className="destination-picker">
              {matches.map((item, index) => (
                <button
                  className={
                    item.id === selectedDestination.id
                      ? "destination-card selected"
                      : "destination-card"
                  }
                  style={{
                    backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.88) 12%, rgba(0,0,0,0.18) 100%), url(${item.heroImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    minHeight: "260px",
                    color: "#ffffff",
                  }}
                  key={item.id}
                  onClick={() => selectDestination(item)}
                >
                  <span className="card-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong style={{ color: "#ffffff" }}>{item.name}</strong>
                  <span style={{ color: "#d1d5db" }}>{item.state}</span>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="atlas-layout" id="atlas">
          <aside className="module-nav">
            <p className="eyebrow">THE IMAGE-RICH FIELD NOTES</p>
            {tabs.map(([id, number, label]) => (
              <button
                className={
                  activeTab === id ? "module-link active" : "module-link"
                }
                key={id}
                onClick={() => setActiveTab(id)}
              >
                <span>{number}</span>
                {label}
              </button>
            ))}
            <button className="module-link" onClick={itinerary}>
              <span>AI</span>
              <Sparkles size={15} /> Cultural itinerary
            </button>
            <div className="aside-note">
              <span className="green-dot" /> Every card carries a place,
              practice, and image.
            </div>
          </aside>
          <section className="module-content">
            <TabViewer
              key={`${selectedDestination.id}-${activeTab}`}
              destination={selectedDestination}
              tab={activeTab}
              onGallery={() => setGalleryOpen(true)}
            />
          </section>
        </section>
        <section className="reviews">
          <div>
            <p className="eyebrow">TRAVELER NOTES</p>
            <h2>
              Leave a little
              <br />
              <em>behind.</em>
            </h2>
          </div>
          <ReviewForm destination={selectedDestination} setNotice={setNotice} />
        </section>
      </main>
      {itineraryPlan && (
        <div className="itinerary-toast">
          <button
            className="toast-close"
            onClick={() => setItineraryPlan(null)}
            aria-label="Close itinerary"
          >
            <X size={14} />
          </button>
          <p className="eyebrow">NOMADE AI / CULTURAL ROUTE</p>
          <h3>{itineraryPlan.title}</h3>
          {itineraryPlan.steps.slice(0, 3).map((step) => (
            <p key={step}>{step}</p>
          ))}
        </div>
      )}
      <footer id="about">
        <div className="wordmark">
          <span className="mark">
            <Compass size={17} />
          </span>{" "}
          NOMADE
        </div>
        <p>Go with context. Return with a story.</p>
        <span>© 2026 Nomade Indian Heritage Atlas</span>
      </footer>
      {galleryOpen && (
        <Gallery
          destination={selectedDestination}
          close={() => setGalleryOpen(false)}
        />
      )}
      {notice && (
        <button className="toast" onClick={() => setNotice("")}>
          {notice}
          <X size={14} />
        </button>
      )}
    </div>
  );
}

function TabViewer({ destination, tab, onGallery }) {
  if (tab === "languages") return <LanguageTab destination={destination} />;
  const data = destination[tab];
  const title = {
    templesAndBeliefs: "Sacred places hold living stories.",
    foodAndCuisine: "Every table carries a regional map.",
    folkDanceAndMusic: "Rhythm is a way of remembering.",
    folkArtAndAttire: "Hands remember what maps forget.",
    historyAndHeritage: "A place is never only one age.",
  }[tab];
  return (
    <>
      <div className="module-header">
        <div>
          <p className="eyebrow">{tabs.find((item) => item[0] === tab)[2]}</p>
          <h2>{title}</h2>
        </div>
        <button className="outline-button" onClick={onGallery}>
          Open image gallery <ArrowUpRight size={16} />
        </button>
      </div>
      <div className="heritage-grid">
        {data.map((item) => (
          <article
            className="heritage-card"
            key={`${destination.id}-${
              item.name ||
              item.dishName ||
              item.formName ||
              item.artName ||
              item.siteName
            }`}
          >
            <img
              src={item.imageUrl || destination.heroImage}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = destination.heroImage;
              }}
              alt={`${item.name || item.dishName || item.formName || item.artName || item.siteName} in ${destination.name}`}
            />
            <div className="heritage-card-body">
              <span className="card-badge">
                {item.badge ||
                  (tab === "historyAndHeritage"
                    ? "Heritage landmark"
                    : "Living tradition")}
              </span>
              <h3>
                {item.name ||
                  item.dishName ||
                  item.formName ||
                  item.artName ||
                  item.siteName}
              </h3>
              <p>
                {item.description ||
                  item.story ||
                  item.craftsmanship ||
                  item.historicalContext}
              </p>
              <small>
                {item.vendorTrail ||
                  item.instruments ||
                  item.attireType ||
                  item.belief ||
                  destination.state}
              </small>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function LanguageTab({ destination }) {
  return (
    <>
      <div className="module-header">
        <div>
          <p className="eyebrow">06 / LANGUAGES & ETIQUETTE</p>
          <h2>Words are a way to arrive gently.</h2>
        </div>
      </div>
      <LanguageTranslator destination={destination} />
      <div className="etiquette">
        <span className="panel-label">CULTURAL ETIQUETTE</span>
        {destination.languages.etiquette.map((item) => (
          <p key={item}>
            <span>+</span>
            {item}
          </p>
        ))}
      </div>
    </>
  );
}
function Gallery({ destination, close }) {
  return (
    <div
      className="gallery-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${destination.name} image gallery`}
    >
      <div className="gallery-panel">
        <div className="gallery-heading">
          <div>
            <p className="eyebrow">VISUAL FIELD NOTES</p>
            <h2>{destination.name}</h2>
          </div>
          <button
            className="icon-button"
            onClick={close}
            aria-label="Close gallery"
          >
            <X />
          </button>
        </div>
        <div className="gallery-grid">
          {destination.gallery.map((src, index) => (
            <img
              key={`${src}-${index}`}
              src={src}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = destination.heroImage;
              }}
              alt={`${destination.name} cultural detail ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
function ReviewForm({ destination, setNotice }) {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          await createReview({
            destinationId: destination.id,
            userName: name,
            comment,
            rating: 5,
          });
        } catch {
          /* local fallback */
        }
        setNotice(`Your note about ${destination.name} has been added.`);
        setName("");
        setComment("");
      }}
    >
      <input
        required
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Your name"
      />
      <textarea
        required
        value={comment}
        onChange={(event) => setComment(event.target.value)}
        placeholder={`What stayed with you in ${destination.name}?`}
      />
      <button className="primary-button">
        Publish note <Star size={15} />
      </button>
    </form>
  );
}

export default App;
