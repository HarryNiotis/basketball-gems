type ClubInfo = {
  code: string;
  name: string;
  abbreviatedName: string;
  editorialName: string;
  tvCode: string;
  isVirtual: boolean;
  images: {
    crest?: string;
  };
};

type Score = {
  club: ClubInfo;
  score: number;
  standingsScore: number;
  partials: {
    partials1: number;
    partials2: number;
    partials3: number;
    partials4: number;
    extraPeriods: Record<string, number>;
  };
};

type Season = {
  name: string;
  code: string;
  alias: string;
  competitionCode: string;
  year: number;
  startDate: string;
};

type Group = {
  id: string;
  order: number;
  name: string;
  rawName: string;
  phaseTypeCode: string;
  seasonCode: string;
};

type Phase = {
  code: string;
  alias: string;
  name: string;
  isGroupPhase: boolean;
};

type Venue = {
  name: string;
  code: string;
  capacity: number;
  address: string;
  images: {
    medium: string | null;
  };
  active: boolean;
  notes: string;
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

type Country = {
  code: string;
  name: string;
};

type Images = {
  crest?: string;
};

type Team = {
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

type Round = {
  seasonCode: string;
  phaseTypeCode: string;
  round: number;
  index: number;
  name: string;
  minGameStartDate: string;
  maxGameStartDate: string;
  datesFormmated: string;
};

type TeamStanding = {
  club: Team;
  data: {
    position: number;
    gamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    pointsFavour: number;
    pointsAgainst: number;
    qualified: boolean;
  };
};

type Standing = {
  group: Group;
  standings: TeamStanding[];
};
