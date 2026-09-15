const API_URL = import.meta.env.VITE_API_URL;

type PostOptions = {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body: string;
};

export async function getWallpaper() {
  try {
    const response = await fetch(`${API_URL}/wallpapers`);
    await response.json();
  } catch (error) {
    console.log({ error });
  }
}

export async function findCharacter({
  characterId,
  position,
  wallpaperId,
  dimensions,
}: {
  characterId: number;
  position: { x: number; y: number };
  wallpaperId: number;
  dimensions: {
    width: number;
    height: number;
  };
}) {
  const options: PostOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ position, dimensions }),
  };
  const response = await fetch(
    `${API_URL}/wallpapers/${wallpaperId}/${characterId}`,
    options,
  );

  console.log(`${API_URL}/wallpapers/${wallpaperId}/${characterId}`);
  if (!response.ok) throw new Error('Error: Request failed!');
  return await response.json();
}
