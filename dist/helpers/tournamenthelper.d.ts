type TournamentScoringSystem = {
    winPoints: number;
    drawPoints: number;
    lossPoints: number;
};
type Match = {
    round: number;
    team1: string;
    team2: string;
    scoreTeam1: number | null;
    scoreTeam2: number | null;
};
type Tournament = {
    tournamentId: Number | undefined;
    tournamentCreator: string;
    tournamentCreatorEmail: string;
    competitionName: string;
    competitors: string[];
    scoringSystem: TournamentScoringSystem;
    rounds: Match[];
};
type TableElement = {
    team: string;
    gamesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
};
declare function databaseFileToTournamentParser(input: any): Tournament;
declare function roundCreatorBergerTables(teams: string[]): Match[];
declare function matchesToTableElement(matches: Match[], teams: string[]): TableElement[];
export { Tournament, TournamentScoringSystem, Match, roundCreatorBergerTables, databaseFileToTournamentParser, matchesToTableElement };
