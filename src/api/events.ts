import { supabase } from "../utils/supabase";
import type {
  Event,
  EventType,
  FestivalEvent,
  Intervener,
} from "../types";

type EventWithType = Event & {
  Event_Intervenant?: Array<{
    id_event: number;
    id_intervenant: number;
    intervenant?: Intervener[] | null;
  }>;
};

type EventTypeRow = {
  id_type: number | string;
  label: string;
};

const toFestivalEvent = (
  event: EventWithType,
  interveners: Intervener[] = [],
  type: EventType | undefined,
): FestivalEvent => {
  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  return {
    id: event.id_event,
    title: event.title,
    type: type ?? null,
    date: event.start_date.slice(0, 10),
    startTime: event.start_date.slice(11, 16),
    duration: endDate
      ? Math.max(
          0,
          Math.round((endDate.getTime() - startDate.getTime()) / 60000),
        )
      : 0,
    location: event.location ?? "",
    area: "",
    image: event.image_url ?? "",
    description: event.description ?? "",
    interveners,
    featured: false,
  };
};

export const getAllEvents = async (): Promise<FestivalEvent[]> => {
  const { data: eventData, error: eventError } = await supabase
    .from("event")
    .select(
      `
      *,
      Event_Intervenant (
        id_event,
        id_intervenant,
        intervenant (*)
      )
    `,
    )
    .order("start_date", { ascending: true });

  if (eventError) {
    console.error("[API événements] erreur Supabase :", eventError);
    throw eventError;
  }

  const events = (eventData ?? []) as EventWithType[];
  if (events.length === 0) {
    return [];
  }

  const typeIds = [...new Set(events.map((event) => event.id_type))];
  const { data: typeData, error: typeError } = await supabase
    .from("type")
    .select("id_type, label")
    .in("id_type", typeIds);

  if (typeError) {
    console.error("[API événements] erreur des types :", typeError);
    throw typeError;
  }

  const typesById = new Map(
    ((typeData ?? []) as EventTypeRow[]).map((eventType) => [
      String(eventType.id_type),
      eventType.label as EventType,
    ]),
  );

  return events.map((event) =>
    toFestivalEvent(
      event,
      (event.Event_Intervenant ?? [])
        .flatMap((relation) => relation.intervenant ?? [])
        .filter(Boolean),
      typesById.get(String(event.id_type)),
    ),
  );
};

export const getEventById = async (
  id: number,
): Promise<FestivalEvent | null> => {
  const { data: eventData, error: eventError } = await supabase
    .from("event")
    .select(
      `
      *,
      Event_Intervenant (
        id_event,
        id_intervenant,
        intervenant (*)
      )
    `,
    )
    .eq("id_event", id)
    .maybeSingle();

  if (eventError) {
    console.error("[API événement] erreur Supabase :", eventError);
    throw eventError;
  }

  if (!eventData) {
    return null;
  }

  const event = eventData as EventWithType;
  const { data: typeData, error: typeError } = await supabase
    .from("type")
    .select("id_type, label")
    .eq("id_type", event.id_type)
    .maybeSingle();

  if (typeError) {
    console.error("[API événement] erreur du type :", typeError);
    throw typeError;
  }

  return toFestivalEvent(
    event,
    (event.Event_Intervenant ?? [])
      .flatMap((relation) => relation.intervenant ?? [])
      .filter(Boolean),
    typeData ? (typeData as EventTypeRow).label as EventType : undefined,
  );
};
