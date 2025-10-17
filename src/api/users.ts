import { NewUser, UpdateUser, User } from "@/types/user";

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "api"
    : "https://json-server-q2gz.onrender.com";

async function api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}/${path}`, options);

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return (await res.json()) as T;
}

export async function getUsers(): Promise<User[]> {
  return await api<User[]>("users");
}

export async function getUser(id: User["id"]): Promise<User> {
  return await api<User>(`users/${id}`);
}

export async function addUser(userData: NewUser): Promise<User> {
  return await api<User>("users", {
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

export async function editUser(
  id: User["id"],
  userData: UpdateUser
): Promise<User> {
  return await api<User>(`users/${id}`, {
    body: JSON.stringify(userData),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
  });
}
