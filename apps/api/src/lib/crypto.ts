export async function createSessionToken() {
  const bytes = crypto.getRandomValues(
    new Uint8Array(32)
  );

  const token = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return token;
}


export async function hashToken(token: string) {
  const encoder = new TextEncoder();

  const data = encoder.encode(token);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  return Array.from(
    new Uint8Array(hashBuffer)
  )
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}