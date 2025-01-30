import "server-only";

const dictionaries = {
  pt: () => import("./dictionaries/pt.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: keyof typeof dictionaries) => {
  const lang = "pt";

  if (!Object.keys(dictionaries).includes(locale)) {
    return dictionaries[lang]();
  }
  
  return dictionaries[locale]();
};