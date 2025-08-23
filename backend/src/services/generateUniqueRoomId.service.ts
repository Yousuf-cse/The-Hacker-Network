const generatedRoomIds = new Set<string>();

export const generateUniqueRoomId = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const getRandomString = (length: number) => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const getFormattedDateTime = () => {
    const now = new Date();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  };

  let roomId: string;

  do {
    roomId = `R${getRandomString(12)}${getFormattedDateTime()}`;
  } while (generatedRoomIds.has(roomId));

  generatedRoomIds.add(roomId);
  return roomId;
};
