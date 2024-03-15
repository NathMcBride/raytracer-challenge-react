export function uuidv4() {
  if (typeof crypto.randomUUID != 'undefined') return crypto.randomUUID();

  //Support for older browsers
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => {
    const d = c as unknown as number;
    return (
      d ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (d / 4)))
    ).toString(16);
  });
}
