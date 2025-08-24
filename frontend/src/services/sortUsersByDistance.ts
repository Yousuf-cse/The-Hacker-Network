type User = {
  _id: string;
  full_name: string;
  age: number;
  avatar?: string;
  email: string;
  phone_number: string;
  address: {
    lat?: number;
    lon?: number;
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    landmark?: string;
  };
  education?: object;
  skills?: object;
  experience_level: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function sortUsersByDistance(
  currentUser: User,
  users: User[]
): (User & { near: number })[] {
  const { lat: currLat, lon: currLon } = currentUser.address;

  if (currLat == null || currLon == null) {
    return users
      .filter((u) => u._id !== currentUser._id)
      .map((user) => ({ ...user, near: Infinity }));
  }

  return users
    .filter((u) => u._id !== currentUser._id)
    .map((user) => {
      if (user.address.lat == null || user.address.lon == null) {
        return { ...user, near: Infinity };
      }
      const distance = getDistance(
        currLat,
        currLon,
        user.address.lat,
        user.address.lon
      );
      return { ...user, near: Number(distance.toFixed(2)) };
    })
    .sort((a, b) => a.near - b.near);
}
