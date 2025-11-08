import type { CreateExhibitionFormData } from "./types";

export async function createExhibition(
  data: CreateExhibitionFormData,
  token: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/exhibitions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  console.log(response);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create exhibition");
  }

  const exhibition = await response.json();
  return exhibition;
}

export async function updateExhibition(
  id: string,
  data: CreateExhibitionFormData,
  token: string,
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/exhibitions/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update exhibition");
  }

  const exhibition = await response.json();
  return exhibition;
}

export async function deleteExhibition(id: string, token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/exhibitions/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete exhibition");
  }

  const exhibition = await response.json();
  return exhibition;
}
