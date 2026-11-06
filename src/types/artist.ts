import type { Intervener } from "./intervener";

export interface Artist extends Intervener {
  role: "artist";
  discipline: string;
}
