export type IntervenantRole = "artist" | "exhibitor" | "Autre";

export interface Intervenant {
  id_intervenant: number;
  nom: string;
  description?: string | null;
  site_web?: string | null;
  role: IntervenantRole;
}
