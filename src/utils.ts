import { monthsEn, monthsEs } from "./consts";

export function createDateTextFromLanguage(lang: "es" | "en", date: Date) {
  if (lang == "es") {
    return `${date.getDate()} de ${
      monthsEs[date.getMonth()]
    }, ${date.getFullYear()}`;
  } else if (lang == "en") {
    return `${
      monthsEn[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  }
}
