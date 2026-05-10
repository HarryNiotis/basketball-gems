export type ClubInfo = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: ClubImages;
};

export type ClubImages = {
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
  images: ClubImages;
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
  medium?: string;
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
  operationsCode?: string;
  referee1?: string;
  referee2?: string;
  referee3?: string;
  referee4?: string;
  venue: Venue;
  isNeutralVenue: boolean;
  gameStatus: string;
  winner?: string;
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

export type GetTeamsResponse = {
  teams: Team[];
};

export type GetTeamByCodeResponse = {
  team: Team | null;
};

export type GetTeamGamesResponse = {
  teamGames: Game[];
};

export type GetStandingsResponse = {
  standings: TeamStanding[];
};
