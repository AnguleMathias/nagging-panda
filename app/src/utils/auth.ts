export const isTokenExpired = (token?: string) => {
  // Assume the token is expired if no token is present
  if (!token) return true;

  const [, payload] = token.split(".");
  if (!payload) return true;

  const decodedPayload = atob(payload); // Using atob to decode base64
  const decoded = JSON.parse(decodedPayload);

  // Convert to milliseconds
  const exp = decoded.exp * 1000;
  const now = new Date().getTime();

  return now >= exp;
};
