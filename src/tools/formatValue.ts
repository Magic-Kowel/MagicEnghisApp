export default function formatValue(value: string[]) {
  if (Array.isArray(value)) {
    return value.join(" / ");
  }
  return value ?? "";
}
