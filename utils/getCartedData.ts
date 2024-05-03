export async function getCartedData() {
  const response = await fetch('http://localhost:8080/carted_donations/cart/14/');

  console.log(response);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}