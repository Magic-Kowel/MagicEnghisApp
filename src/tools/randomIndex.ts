export function randomIndex<T extends Record<string, any>>(list: T[]) {
  return Math.floor(Math.random() * list.length);
}
