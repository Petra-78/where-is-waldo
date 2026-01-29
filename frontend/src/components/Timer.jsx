export default function Timer({ elapsed }) {
  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const milliseconds = elapsed % 1000;

  const pad2 = (n) => n.toString().padStart(2, "0");
  const pad3 = (n) => n.toString().padStart(3, "0");

  return (
    <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
      {pad2(minutes)}:{pad2(seconds)}:{pad3(milliseconds)}
    </div>
  );
}
