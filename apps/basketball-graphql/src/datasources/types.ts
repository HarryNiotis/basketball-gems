// Type definitions for Euroleague API responses

export type ApiResponse<T> = {
  data: T;
};

export type Images = {
  crest?: string;
};

export type Country = {
  code: string;
  name: string;
};

export type Team = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: Images;
  sponsor: string;
  clubPermanentName: string;
  clubPermanentAlias: string;
  country: Country;
  address: string;
  website: string;
  ticketsUrl: string;
  twitterAccount: string;
  venueCode: string;
  city: string;
  president: string;
  phone: string;
};

export type ClubInfo = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: Images;
};

export type Season = {
  name: string;
  code: string;
  alias: string;
  competitionCode: string;
  year: number;
  startDate: string;
};

export type Group = {
  id: string;
  order: number;
  name: string;
  rawName: string;
  phaseTypeCode: string;
  seasonCode: string;
};

export type Phase = {
  code: string;
  alias: string;
  name: string;
  isGroupPhase: boolean;
};

export type VenueImages = {
  medium: string | null;
};

export type Venue = {
  name: string;
  code: string;
  capacity: number;
  address: string;
  images: VenueImages;
  active: boolean;
  notes: string;
};

export type Partials = {
  partials1: number;
  partials2: number;
  partials3: number;
  partials4: number;
  extraPeriods: Record<string, number>;
};

export type Score = {
  club: ClubInfo;
  score: number;
  standingsScore: number;
  partials: Partials;
};

export type Game = {
  id: string;
  identifier: string;
  gameCode: number;
  season: Season;
  group: Group;
  phaseType: Phase;
  round: number;
  roundAlias: string;
  roundName: string;
  played: boolean;
  date: string;
  confirmedDate: boolean;
  confirmedHour: boolean;
  localTimeZone: number;
  localDate: string;
  utcDate: string;
  local: Score;
  road: Score;
  audience: number;
  audienceConfirmed: boolean;
  socialFeed: string;
  operationsCode: string | null;
  referee1: string | null;
  referee2: string | null;
  referee3: string | null;
  referee4: string | null;
  venue: Venue;
  isNeutralVenue: boolean;
  gameStatus: string;
  winner: string | null;
};

export type Round = {
  seasonCode: string;
  phaseTypeCode: string;
  round: number;
  index: number;
  name: string;
  minGameStartDate: string;
  maxGameStartDate: string;
  datesFormatted: string;
};

export type StandingData = {
  position: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  pointsFavour: number;
  pointsAgainst: number;
  qualified: boolean;
};

export type TeamStanding = {
  club: Team;
  data: StandingData;
};

export type Standing = {
  group: Group;
  standings: TeamStanding[];
};
