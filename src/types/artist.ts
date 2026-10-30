import type { Intervener } from "./Intervener";

export interface Artist extends Intervener {
  role: "artist";
  discipline: string;
}
