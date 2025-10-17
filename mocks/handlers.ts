import { Country, NewUser, UpdateUser, User } from "@/types/user";
import { http, HttpResponse, passthrough } from "msw";

const users: User[] = [
  {
    id: "1",
    country: Country.USA,
    firstName: "Eric",
    lastName: "Smith",
    age: 35,
  },
  {
    id: "2",
    country: Country.Australia,
    firstName: "Kate",
    lastName: "Johnson",
    age: 29,
  },
  {
    id: "3",
    country: Country.UK,
    firstName: "Nick",
    lastName: "Roswell",
    age: 42,
  },
];

export const handlers = [
  http.get<never, never, User[]>("api/users", async () =>
    HttpResponse.json(users)
  ),

  http.get<{ id: string }, never, User>("api/users/:id", async ({ params }) =>
    HttpResponse.json(users.find((user: User) => user.id === params.id))
  ),

  http.patch<{ id: string }, UpdateUser, User>(
    "api/users/:id",
    async ({ params, request }) => {
      const data = await request.json();
      const user = users.find((user) => user.id === params.id);

      if (!user) {
        return HttpResponse.json(null, { status: 404 });
      }

      Object.assign(user, data);

      return HttpResponse.json(user);
    }
  ),

  http.post<never, NewUser, User>("api/users", async ({ request }) => {
    const data = await request.json();
    const user: User = { id: (users.length + 1).toString(), ...data };

    users.push(user);

    return HttpResponse.json(user);
  }),

  http.all("*", () => passthrough()),
];
