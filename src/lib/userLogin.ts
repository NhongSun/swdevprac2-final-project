export default async function userLogin(email: string, password: string) {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";

  const resp = await fetch(`${backendUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!resp.ok) {
    throw new Error("Failed to login");
  }

  return await resp.json();
}
