import { supabase } from "../../utils/supabase";
import type { Event, FestivalEvent } from "../types";

function toFestivalEvent(event: Event & { type?: { label?: string } | null }): FestivalEvent {
  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  return {
    id: event.id_event,
    titre: event.title,
    type: (event.type?.label ?? "autre") as FestivalEvent["type"],
    date: event.start_date.slice(0, 10),
    heureDebut: event.start_date.slice(11, 16),
    duree: endDate
      ? Math.max(0, Math.round((endDate.getTime() - startDate.getTime()) / 60000))
      : 0,
    lieu: event.location ?? "",
    zone: "",
    image: "",
    description: event.description ?? "",
    artistes: [],
    phare: false,
  };
}

export async function getAllEvents(): Promise<FestivalEvent[]> {
  const { data, error } = await supabase
    .from("event")
    .select("*")
    .order("start_date", { ascending: true });

  console.log("[API événements] réponse Supabase :", {
    nombre: data?.length ?? 0,
    data,
    error,
  });

  if (error) {
    console.error("[API événements] erreur Supabase :", error);
    throw error;
  }

  const events = (
    (data ?? []) as (Event & { type?: { label?: string } | null })[]
  ).map(
    toFestivalEvent,
  );

  console.log("[Events API] converted events:", events);

  return events;
}
