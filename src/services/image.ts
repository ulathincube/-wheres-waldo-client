const API_URL = import.meta.env.VITE_API_URL;

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
  counter: number;
}

interface CompletGameRespnse {
  data: string;
  counter: number;
  error: unknown;
  message: string;
}

export async function getWallpaper(): Promise<ResponseData> {
  const response = await fetch(`${API_URL}/wallpapers`, {
    method: 'GET',
    credentials: 'include',
  });
  const data: ResponseData = await response.json();
  return data;
}

export async function findCharacter({
  characterId,
  position,
  wallpaperId,
}: {
  characterId: string;
  position: { x: number; y: number };
  wallpaperId: string;
}) {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ position }),
  };
  const response = await fetch(
    `${API_URL}/wallpapers/${wallpaperId}/${characterId}`,
    options,
  );

  console.log(`${API_URL}/wallpapers/${wallpaperId}/${characterId}`);
  if (!response.ok) throw new Error('Error: Request failed!');
  return await response.json();
}

export async function completeGame(
  wallpaperId: string,
  completionTime: number,
): Promise<CompletGameRespnse> {
  const options: RequestInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      foundCharacters: 3,
      completionTime,
    }),
  };
  const response = await fetch(
    `${API_URL}/wallpapers/${wallpaperId}/complete`,
    options,
  );
  if (!response.ok) throw new Error('Unable to fetch this resource');
  const data: CompletGameRespnse = await response.json();
  return data;
}
