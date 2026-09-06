const API_URL = import.meta.env.VITE_API_URL;

type PostOptions = {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body: string;
};

export async function findCharacter({
  character,
  position,
  imageId,
}: {
  character: string;
  position: { x: number; y: number };
  imageId: number;
}) {
  const options: PostOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(position),
  };
  const response = await fetch(
    `${API_URL}/images/${imageId}/${character}`,
    options,
  );
  if (!response.ok) throw new Error('Error: Request failed!');
  return await response.json();
}
