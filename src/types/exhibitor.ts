import type { Intervenant } from './Intervenant';

export interface Exhibitor extends Intervenant {
  role: 'exhibitor';
}
