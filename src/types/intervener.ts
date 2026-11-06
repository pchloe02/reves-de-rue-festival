export type IntervenerRole = "artist" | "exhibitor" | "other";

export interface Intervener {
  id_intervenant: number;
  name: string;
  description?: string | null;
  site_web?: string | null;
  role: IntervenerRole;
}
