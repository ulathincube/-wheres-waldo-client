const API_URL = import.meta.env.VITE_API_URL;

interface User {
  username: string;
  id: string;
  time: number;
}

export async function saveUser(username: string) {
  const postOptions: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  };

  const response = await fetch(`${API_URL}/users`, postOptions);
  if (!response.ok) throw new Error('Unable to process this route!');
  const data = await response.json();
  return data;
}

export async function getUsers(): Promise<User[] | null> {
  const options: RequestInit = {
    method: 'GET',
    credentials: 'include',
  };

  const response = await fetch(`${API_URL}/users`, options);
  if (!response.ok) throw new Error('Unable to fetch this resource!');

  const { data }: { data: User[] | null } = await response.json();
  return data;
}
