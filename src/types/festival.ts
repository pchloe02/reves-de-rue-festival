export interface PracticalInfo {
  title: string;
  text: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface SocialNetwork {
  name: string;
  link: string;
}

export interface Festival {
  name: string;
  dates: string;
  location: string;
  image: string;
  description: string;
  practicalInfo: PracticalInfo[];
  map: string;
  partners: Partner[];
  socialNetworks: SocialNetwork[];
}
