import axios from "axios";

export const getLatLngFromAddress = async (address: string) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${apiKey}`;

  const response = await axios.get(url);
  console.log("lan and lat response : ", response);
  if (response.data.results.length > 0) {
    const location = response.data.results[0].geometry.location;
    return { lat: location.lat, lng: location.lng };
  }
  return null;
};
