export function isDemoBuild(mode: string) {
  return mode === 'demo';
}

export const isDemoMode = isDemoBuild(import.meta.env.MODE);
