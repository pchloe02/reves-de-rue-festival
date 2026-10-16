import { supabase } from "../../utils/supabase";
import type { Artiste, Exhibitor, Intervenant } from "../types";

export async function getAllIntervenants(): Promise<Intervenant[]> {
  const { data, error } = await supabase.from("intervenant").select("*");

  if (error) {
    throw error;
  }

  return (data ?? []) as Intervenant[];
}

export async function getIntervenantsByRole(
  role: "artist" | "exhibitor",
): Promise<Artiste[] | Exhibitor[]> {
  const { data, error } = await supabase
    .from("intervenant")
    .select("*")
    .eq("role", role);

  if (error) {
    throw error;
  }

  return (data ?? []) as Artiste[] | Exhibitor[];
}
