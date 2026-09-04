export const locales = ['en', 'fr', 'es', 'de'] as const;
export type Locale = (typeof locales)[number];
