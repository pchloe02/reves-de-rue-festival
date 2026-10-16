export interface Event {
  id_event: number;
  id_type: number;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  location: string | null;
}

export type EventType = 'fresque live' | 'atelier participatif' | 'performance';

export interface FestivalEvent {
  id: number;
  titre: string;
  type: EventType;
  date: string;
  heureDebut: string;
  duree: number;
  lieu: string;
  zone: string;
  image: string;
  description: string;
  artistes: number[];
  phare: boolean;
}

export interface EventsByDay {
  date: string;
  events: FestivalEvent[];
}
