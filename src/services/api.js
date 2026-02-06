
const BASE_URL = "https://raftlabs-backend-1.onrender.com/api";

export const fetchMenu = async () => {
  const res = await fetch(`${BASE_URL}/menu`);
  return res.json();
};

export const placeOrder = async (order) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const fetchOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`);
  return res.json();
};

export const trackOrder = async (orderId) => {
  const res = await fetch(`${BASE_URL}/orders/${orderId}`);
  return res.json();
}
