const API_URL = import.meta.env.VITE_API_URL;

type PostOptions = {
  method: string;
  headers: {
    'Content-Type': string;
  };
  body: string;
};

interface ResponseData {
  data: {
    url: string;
    name: string;
    id: string;
    characters: {
      url: string;
      name: string;
      id: string;
      position_x: number;
      position_y: number;
    }[];
  };
  message: string;
  error: unknown;
}

export async function getWallpaper(): Promise<ResponseData> {
  const response = await fetch(`${API_URL}/wallpapers`);
  const data: ResponseData = await response.json();
  return data;
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
