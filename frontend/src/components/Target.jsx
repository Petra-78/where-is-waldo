export default function Target({ x, y }) {
  return (
    <>
      <div
        className="target"
        style={{
          position: "absolute",
          transform: "translate(-50%, -50%)",
          left: `${x * 100}%`,
          top: `${y * 100}%`,
        }}
      ></div>
    </>
  );
}
