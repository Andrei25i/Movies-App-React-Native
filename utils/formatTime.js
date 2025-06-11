export const formatTime = (runtime) => {
  if (!runtime) return "";

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}m`;
};