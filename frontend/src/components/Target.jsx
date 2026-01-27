import Dropdown from "./Dropdown";

export default function Target({ x, y }) {
  return (
    <div
      className="targetWrapper"
      style={{
        position: "absolute",

        left: `${x * 100}%`,
        top: `${y * 100}%`,
      }}
    >
      <div
        className="target"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>
      <Dropdown />
    </div>
  );
}
