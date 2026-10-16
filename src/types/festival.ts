export interface PracticalInfo {
  titre: string;
  texte: string;
}

export interface Partner {
  nom: string;
  logo: string;
}

export interface SocialNetwork {
  nom: string;
  lien: string;
}

export interface Festival {
  nom: string;
  dates: string;
  lieu: string;
  image: string;
  description: string;
  infosPratiques: PracticalInfo[];
  carte: string;
  partenaires: Partner[];
  reseaux: SocialNetwork[];
}
