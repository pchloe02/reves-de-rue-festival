import { supabase } from "../utils/supabase";
import type {
  Event,
  EventIntervener,
  FestivalEvent,
  Intervener,
} from "../types";

type EventWithType = Event & {
  type?: { label?: string } | null;
};

function normalizeIntervener(
  intervener: Intervener & { nom?: string },
): Intervener {
  return {
    ...intervener,
    name: intervener.nom ?? intervener.name,
  };
}

function toFestivalEvent(
  event: EventWithType,
  interveners: Intervener[] = [],
): FestivalEvent {
  const startDate = new Date(event.start_date);
  const endDate = event.end_date ? new Date(event.end_date) : null;

  return {
    id: event.id_event,
    title: event.title,
    type: (event.type?.label ?? "autre") as FestivalEvent["type"],
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
    image: "",
    description: event.description ?? "",
    interveners,
    featured: false,
  };
}

export async function getAllEvents(): Promise<FestivalEvent[]> {
  const { data: eventData, error: eventError } = await supabase
    .from("event")
    .select("*")
    .order("start_date", { ascending: true });

  if (eventError) {
    console.error("[API événements] erreur Supabase :", eventError);
    throw eventError;
  }

  const events = (eventData ?? []) as EventWithType[];
  if (events.length === 0) {
    return [];
  }

  const eventIds = events.map((event) => event.id_event);
  const { data: relationData, error: relationError } = await supabase
    .from("Event_Intervenant")
    .select("id_event, id_intervenant")
    .in("id_event", eventIds);

  if (relationError) {
    console.error(
      "[API événements] erreur des relations interveners :",
      relationError,
    );
    return events.map((event) => toFestivalEvent(event));
  }

  const relations = (relationData ?? []) as EventIntervener[];
  const intervenerIds = [
    ...new Set(relations.map((relation) => relation.id_intervenant)),
  ];
  let interveners: Intervener[] = [];

  if (intervenerIds.length > 0) {
    const { data: intervenerData, error: intervenerError } = await supabase
      .from("intervenant")
      .select("*")
      .in("id_intervenant", intervenerIds);

    if (intervenerError) {
      console.error(
        "[API événements] erreur des interveners liés :",
        intervenerError,
      );
    } else {
      interveners = (intervenerData ?? []).map((intervener) =>
        normalizeIntervener(intervener as Intervener & { nom?: string }),
      );
    }
  }

  const intervenersById = new Map(
    interveners.map((intervener) => [
      intervener.id_intervenant,
      normalizeIntervener(intervener as Intervener & { nom?: string }),
    ]),
  );

  const convertedEvents = events.map((event) => {
    const eventInterveners = relations
      .filter((relation) => relation.id_event === event.id_event)
      .map((relation) => intervenersById.get(relation.id_intervenant))
      .filter((intervener): intervener is Intervener => Boolean(intervener));

    return toFestivalEvent(event, eventInterveners);
  });

  console.log("[Events API] converted events:", convertedEvents);

  return convertedEvents;
}

export async function getEventById(id: number): Promise<FestivalEvent | null> {
  const { data: eventData, error: eventError } = await supabase
    .from("event")
    .select("*")
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
  const { data: relationData, error: relationError } = await supabase
    .from("Event_Intervenant")
    .select("id_event, id_intervenant")
    .eq("id_event", id);

  if (relationError) {
    console.error(
      "[API événement] erreur de la relation interveners :",
      relationError,
    );
    return toFestivalEvent(event);
  }

  const relations = (relationData ?? []) as EventIntervener[];
  const intervenerIds = [
    ...new Set(relations.map((relation) => relation.id_intervenant)),
  ];

  if (intervenerIds.length === 0) {
    return toFestivalEvent(event);
  }

  const { data: intervenerData, error: intervenerError } = await supabase
    .from("intervenant")
    .select("*")
    .in("id_intervenant", intervenerIds);

  if (intervenerError) {
    console.error(
      "[API événement] erreur des interveners liés :",
      intervenerError,
    );
    return toFestivalEvent(event);
  }

  const intervenersById = new Map(
    ((intervenerData ?? []) as Intervener[]).map((intervener) => [
      intervener.id_intervenant,
      normalizeIntervener(intervener as Intervener & { nom?: string }),
    ]),
  );
  const interveners = relations
    .map((relation) => intervenersById.get(relation.id_intervenant))
    .filter((intervener): intervener is Intervener => Boolean(intervener));

  return toFestivalEvent(event, interveners);
}
