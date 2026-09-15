export default function includesValue(
  data: { x: number; y: number; characterId: number }[],
  value: number,
) {
  data.forEach(charObject => {
    if (charObject.characterId === value) return true;
  });
  return false;
}
