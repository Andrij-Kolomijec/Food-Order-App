export async function fetchAvailableMeals() {
  const response = await fetch(import.meta.env.VITE_PORT_MEALS);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch meals.");
  }

  return resData;
}

export async function sendUserOrder(meals: object) {
  const response = await fetch(import.meta.env.VITE_PORT_ORDER, {
    method: "POST",
    body: JSON.stringify({ meals }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to send user data.");
  }

  return resData.message;
}
