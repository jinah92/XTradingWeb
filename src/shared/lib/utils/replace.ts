export const urlReplace = (url: string, replace: [string, string | number | undefined][]): string =>
  replace.reduce<string>(
    (replacedUrl, [key, value]) =>
      Number.isInteger(value) || value ? replacedUrl.replace(new RegExp(key, 'gi'), String(value)) : replacedUrl,
    url,
  );
