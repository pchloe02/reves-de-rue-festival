import { supabase } from "../utils/supabase";
import type { Intervener } from "../types";

const INTERVENER_COLUMNS =
  "id_intervenant, name, description, role, discipline";

export const getAllInterveners = async (): Promise<Intervener[]> => {
  const { data, error } = await supabase
    .from("intervenant")
    .select(INTERVENER_COLUMNS);

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getIntervenersByRole = async (
  role: Intervener["role"],
): Promise<Intervener[]> => {
  const { data, error } = await supabase
    .from("intervenant")
    .select(INTERVENER_COLUMNS)
    .eq("role", role);

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getIntervenersByEventId = async (
  idEvent: number,
): Promise<Intervener[]> => {
  const { data, error } = await supabase
    .from("Event_Intervenant")
    .select(`intervenant (${INTERVENER_COLUMNS})`)
    .eq("id_event", idEvent);

  if (error) {
    throw error;
  }

  return (data ?? [])
    .flatMap((relation) => relation.intervenant ?? [])
    .filter(Boolean);
};
