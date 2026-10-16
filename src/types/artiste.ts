import type { Intervenant } from "./Intervenant";

export interface Artiste extends Intervenant {
  role: "artist";
  discipline: string;
}
