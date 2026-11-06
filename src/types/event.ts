import type { Intervener } from './intervener';

export interface Event {
  id_event: number;
  id_type: number;
  title: string;
  start_date: string;
  end_date: string | null;
  description: string | null;
  location: string | null;
  image_url: string | null;
}

export type EventType =
  | 'Fresque live'
  | 'Stencil Pochoir'
  | 'Light painting'
  | 'Mapping 3d'
  | 'Calligraffiti'
  | 'Nourriture'
  | 'Pop-up store';

export interface FestivalEvent {
  id: number;
  title: string;
  type: EventType | null;
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
