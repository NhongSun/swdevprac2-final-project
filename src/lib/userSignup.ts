export default async function userSignup(
  name: string,
  email: string,
  password: string,
  tel: string,
  role: "member" | "admin",
) {
  const backendUrl = process.env.BACKEND_URL ?? "http://localhost:8000/api/v1";
  console.log(JSON.stringify({ email, password, name, tel, role }));

  const resp = await fetch(`${backendUrl}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name, tel, role: "member" }),
  });

  if (!resp.ok) {
    throw new Error("Failed to login");
  }

  return await resp.json();
}
