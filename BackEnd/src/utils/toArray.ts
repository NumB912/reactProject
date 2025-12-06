function toArray(param?: string | string[]): string[] {
  if (!param) return [];
  return Array.isArray(param) ? param : [param];
}