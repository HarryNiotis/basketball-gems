import { gql, type TypedDocumentNode } from '@apollo/client';
import type {
  GetStandingsResponse,
  GetTeamByCodeResponse,
  GetTeamGamesResponse,
  GetTeamsResponse,
} from './types';

export const TEAM_FRAGMENT = gql`
  fragment TeamFields on Team {
    code
    name
    abbreviatedName
    editorialName
    tvCode
    isVirtual
    images {
      crest
    }
    sponsor
    clubPermanentName
    clubPermanentAlias
    country {
      code
      name
    }
    address
    website
    ticketsUrl
    twitterAccount
    venueCode
    city
    president
    phone
  }
`;

export const CLUB_INFO_FRAGMENT = gql`
  fragment ClubInfoFields on ClubInfo {
    code
    name
    abbreviatedName
    editorialName
    tvCode
    isVirtual
    images {
      crest
    }
  }
`;

export const SCORE_FRAGMENT = gql`
  ${CLUB_INFO_FRAGMENT}
  fragment ScoreFields on Score {
    club {
      ...ClubInfoFields
    }
    score
    standingsScore
    partials {
      partials1
      partials2
      partials3
      partials4
      extraPeriods
    }
  }
`;

export const VENUE_FRAGMENT = gql`
  fragment VenueFields on Venue {
    name
    code
    capacity
    address
    images {
      medium
    }
    active
    notes
  }
`;

export const GAME_FRAGMENT = gql`
  ${SCORE_FRAGMENT}
  ${VENUE_FRAGMENT}
  fragment GameFields on Game {
    id
    identifier
    gameCode
    season {
      name
      code
      alias
      competitionCode
      year
      startDate
    }
    group {
      id
      order
      name
      rawName
      phaseTypeCode
      seasonCode
    }
    phaseType {
      code
      alias
      name
      isGroupPhase
    }
    round
    roundAlias
    roundName
    played
    date
    confirmedDate
    confirmedHour
    localTimeZone
    localDate
    utcDate
    local {
      ...ScoreFields
    }
    road {
      ...ScoreFields
    }
    audience
    audienceConfirmed
    socialFeed
    operationsCode
    referee1
    referee2
    referee3
    referee4
    venue {
      ...VenueFields
    }
    isNeutralVenue
    gameStatus
    winner
  }
`;

export const TEAM_STANDING_FRAGMENT = gql`
  ${TEAM_FRAGMENT}
  fragment TeamStandingFields on TeamStanding {
    club {
      ...TeamFields
    }
    data {
      position
      gamesPlayed
      gamesWon
      gamesLost
      pointsFavour
      pointsAgainst
      qualified
    }
  }
`;

export const GET_TEAMS: TypedDocumentNode<GetTeamsResponse> = gql`
  ${TEAM_FRAGMENT}
  query GetTeams {
    teams {
      ...TeamFields
    }
  }
`;

export const GET_TEAM_BY_CODE: TypedDocumentNode<
  GetTeamByCodeResponse,
  { code: string }
> = gql`
  ${TEAM_FRAGMENT}
  query GetTeamByCode($code: String!) {
    team(code: $code) {
      ...TeamFields
    }
  }
`;

export const GET_TEAM_GAMES: TypedDocumentNode<
  GetTeamGamesResponse,
  { teamCode: string }
> = gql`
  ${GAME_FRAGMENT}
  query GetTeamGames($teamCode: String!) {
    teamGames(teamCode: $teamCode) {
      ...GameFields
    }
  }
`;

export const GET_STANDINGS: TypedDocumentNode<
  GetStandingsResponse,
  { round?: number }
> = gql`
  ${TEAM_STANDING_FRAGMENT}
  query GetStandings($round: Int) {
    standings(round: $round) {
      ...TeamStandingFields
    }
  }
`;
