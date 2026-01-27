export default function Dropdown() {
  const characters = ["Mary", "Bob", "Stewart"];
  return (
    <ul
      className="dropdown"
      style={{ padding: "0", margin: "0", transform: "translate(-30%, -0%)" }}
    >
      <li>
        <button>{characters[0]}</button>
      </li>
      <li>
        <button>{characters[1]}</button>
      </li>
      <li>
        <button>{characters[2]}</button>
      </li>
    </ul>
  );
}
