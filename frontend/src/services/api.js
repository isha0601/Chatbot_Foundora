export const sendMessage = async (message) => {
  const res = await fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};
