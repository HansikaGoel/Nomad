const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!response.ok) throw new Error((await response.json()).error || 'Request failed');
  return response.json();
}

export const getDestinations = () => request('/destinations');
export const getDashboard = (id) => request(`/destinations/${id}/dashboard`);
export const getComparison = (first, second) => request(`/destinations/compare?d1=${first}&d2=${second}`);
export const translatePhrase = (destinationId, text) => request('/translator/scan', { method: 'POST', body: JSON.stringify({ destinationId, text }) });
export const generateItinerary = (destinationId, days, focus) => request('/ai/itinerary', { method: 'POST', body: JSON.stringify({ destinationId, days, focus }) });
export const createReview = (review) => request('/reviews', { method: 'POST', body: JSON.stringify(review) });
