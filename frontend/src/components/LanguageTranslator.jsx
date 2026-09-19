import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const LANGUAGES = {
  Hindi: "hi",
  English: "en",
  Spanish: "es",
  French: "fr",
  German: "de",
  "Braj Bhasha": "hi",
  Tamil: "ta",
  Telugu: "te",
  Kannada: "kn",
  Gujarati: "gu",
};
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function LanguageTranslator({ destination, setNotice }) {
  const [from, setFrom] = useState("Hindi");
  const [to, setTo] = useState("English");
  const [text, setText] = useState(destination.languages.phrases[0].original);
  const [translatedText, setTranslatedText] = useState(
    destination.languages.phrases[0].translation,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function translate() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/translate`, {
        text,
        sourceLang: LANGUAGES[from],
        targetLang: LANGUAGES[to],
      });
      setTranslatedText(response.data.translatedText);
      setNotice?.(`Translated from ${from} to ${to}.`);
    } catch (requestError) {
      setError(
        requestError.response?.data?.error ||
          "Translation service unavailable. Try again shortly.",
      );
    } finally {
      setLoading(false);
    }
  }

  function swapLanguages() {
    setFrom(to);
    setTo(from);
    setText(translatedText);
    setTranslatedText(text);
  }

  return (
    <div className="translator-panel">
      <div className="translator-controls">
        <label>
          From
          <select
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          >
            {Object.keys(LANGUAGES).map((language) => (
              <option key={language}>{language}</option>
            ))}
          </select>
        </label>
        <button
          className="swap-languages"
          type="button"
          onClick={swapLanguages}
          aria-label="Swap languages"
        >
          ⇄
        </button>
        <label>
          To
          <select value={to} onChange={(event) => setTo(event.target.value)}>
            {Object.keys(LANGUAGES).map((language) => (
              <option key={language}>{language}</option>
            ))}
          </select>
        </label>
      </div>
      <span className="panel-label">
        ANY WORD OR PHRASE / {destination.name}
      </span>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type any word, sentence, or phrase"
      />
      <button className="primary-button" onClick={translate} disabled={loading}>
        {loading ? (
          "Translating..."
        ) : (
          <>
            Translate <Send size={15} />
          </>
        )}
      </button>
      <div className="translation-result">
        <span>
          {from} → {to}
        </span>
        <strong>{translatedText}</strong>
        <em>Live translation</em>
        <p>
          {error ||
            `Powered by the NOMADE translation service for ${destination.name}.`}
        </p>
      </div>
    </div>
  );
}
