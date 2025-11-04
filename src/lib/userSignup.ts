export default async function userSignup(
  name: string,
  email: string,
  password: string,
  tel: string,
  role: "member" | "admin",
) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL!;

  const resp = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, tel, role }),
  });

  if (!resp.ok) {
    throw new Error("Failed to login");
  }

  return await resp.json();
}
