export default async function userLogin(email: string, password: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

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
