import { Sparkles } from "lucide-react";

export default function AIPlanner({ onGenerate }) {
  return (
    <button className="primary-button" onClick={onGenerate}>
      <Sparkles size={16} /> Compose my days
    </button>
  );
}
