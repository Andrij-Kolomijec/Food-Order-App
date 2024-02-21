export async function fetchAvailableMeals<T>(): Promise<T> {
  const response = await fetch(import.meta.env.VITE_PORT_MEALS);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch meals.");
  }

  return resData;
}

export async function sendUserOrder(data: string) {
  const response = await fetch(import.meta.env.VITE_PORT_ORDER, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }

  return resData;
}
