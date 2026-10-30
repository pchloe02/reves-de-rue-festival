import { supabase } from "../utils/supabase";
import type { Artist, Exhibitor, Intervener } from "../types";

export async function getAllInterveners(): Promise<Intervener[]> {
  const { data, error } = await supabase.from("intervenant").select("*");

  if (error) {
    throw error;
  }

  return (data ?? []).map((intervener) => ({
    ...intervener,
    name: intervener.nom,
  })) as Intervener[];
}

export async function getIntervenersByRole(
  role: "artist" | "exhibitor",
): Promise<Artist[] | Exhibitor[]> {
  const { data, error } = await supabase
    .from("intervenant")
    .select("*")
    .eq("role", role);

  if (error) {
    throw error;
  }

  return (data ?? []).map((intervener) => ({
    ...intervener,
    name: intervener.nom,
  })) as Artist[] | Exhibitor[];
}
