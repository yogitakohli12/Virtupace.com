// deno --unstable-sloppy-imports --allow-read --allow-write ./src/locales/locale.ts

import { locales } from "./index";
import fs from "node:fs";
const loadJSON = (path: string) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)) as any);

export const all = locales.filter((l) => l !== "en");

all.forEach(async (l) => {
  const enData = loadJSON(`./output/en.json`);
  const localeData = loadJSON(`./output/${l}.json`);
  const newLocaleData: any = { ...localeData };
  let count = 0;
  Object.entries(enData).forEach(([enKey, enValue]: [string, any]) => {
    if (localeData[enValue]) {
      delete newLocaleData[enValue];
      newLocaleData[enKey] = localeData[enValue];
      count++;
    }
  });
  console.log(`${l} - ${count}`);
  fs.writeFileSync(
    new URL(`./output/${l}.json`, import.meta.url),
    JSON.stringify(newLocaleData, null, 2)
  );
});
