export const nextId = (ids: readonly string[], currentId: string | null | undefined) => {
  if (!ids.length) return null;
  if (!currentId) return ids[0] || null;
  const idx = ids.indexOf(currentId);
  if (idx === -1) return ids[0] || null;
  return ids[(idx + 1) % ids.length] || null;
};

export const prevId = (ids: readonly string[], currentId: string | null | undefined) => {
  if (!ids.length) return null;
  if (!currentId) return ids[0] || null;
  const idx = ids.indexOf(currentId);
  if (idx === -1) return ids[0] || null;
  return ids[(idx - 1 + ids.length) % ids.length] || null;
};

