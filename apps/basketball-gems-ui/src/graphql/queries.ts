import { gql } from '@apollo/client';

// Fragment for reusable team fields
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

// Fragment for club info (used in scores)
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

// Fragment for game score
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

// Fragment for venue
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

// Fragment for game fields
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

// Fragment for team standing
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

// Query: Get all teams
export const GET_TEAMS = gql`
  ${TEAM_FRAGMENT}
  query GetTeams {
    teams {
      ...TeamFields
    }
  }
`;

// Query: Get team by code
export const GET_TEAM_BY_CODE = gql`
  ${TEAM_FRAGMENT}
  query GetTeamByCode($code: String!) {
    team(code: $code) {
      ...TeamFields
    }
  }
`;

// Query: Get team games
export const GET_TEAM_GAMES = gql`
  ${GAME_FRAGMENT}
  query GetTeamGames($teamCode: String!) {
    teamGames(teamCode: $teamCode) {
      ...GameFields
    }
  }
`;

// Query: Get all rounds
export const GET_ROUNDS = gql`
  query GetRounds($phaseTypeCode: String) {
    rounds(phaseTypeCode: $phaseTypeCode) {
      seasonCode
      phaseTypeCode
      round
      index
      name
      minGameStartDate
      maxGameStartDate
      datesFormatted
    }
  }
`;

// Query: Get standings - uses current round if not specified
export const GET_STANDINGS = gql`
  ${TEAM_STANDING_FRAGMENT}
  query GetStandings($round: Int) {
    standings(round: $round) {
      ...TeamStandingFields
    }
  }
`;

// Query: Get games with filters
export const GET_GAMES = gql`
  ${GAME_FRAGMENT}
  query GetGames($teamCode: String, $round: Int, $played: Boolean) {
    games(teamCode: $teamCode, round: $round, played: $played) {
      ...GameFields
    }
  }
`;

// Query: Get single game by ID
export const GET_GAME = gql`
  ${GAME_FRAGMENT}
  query GetGame($id: String!) {
    game(id: $id) {
      ...GameFields
    }
  }
`;
