import Dropdown from "./Dropdown";

export default function Target({
  x,
  y,
  characters,
  setCharacters,
  setMarkers,
}) {
  const coordinates = { x, y };
  return (
    <div
      className="targetWrapper"
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
      }}
    >
      <div className="target" />

      <Dropdown
        characters={characters}
        setCharacters={setCharacters}
        setMarkers={setMarkers}
        coordinates={coordinates}
      />
    </div>
  );
}
