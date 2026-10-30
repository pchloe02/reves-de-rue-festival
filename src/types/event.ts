import type { Intervener } from './Intervener';

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
  title: string;
  type: EventType;
  date: string;
  startTime: string;
  duration: number;
  location: string;
  area: string;
  image: string;
  description: string;
  interveners: Intervener[];
  featured: boolean;
}

export interface EventsByDay {
  date: string;
  events: FestivalEvent[];
}
