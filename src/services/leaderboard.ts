const API_URL = import.meta.env.VITE_API_URL;

interface PostOptions {
  method: 'POST';
  'Content-Type': 'application/json';
  body: string;
}

export async function saveUser(username: string) {
  const postOptions: PostOptions = {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      username,
    }),
  };

  const response = await fetch(`${API_URL}/leaderboard`, postOptions);
  if (!response.ok) throw new Error('Unable to process this route!');
  const data = await response.json();
  return data;
}
