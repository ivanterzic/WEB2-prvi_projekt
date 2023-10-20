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
    competitionName: string;
    competitors: string[];
    scoringSystem: TournamentScoringSystem;
    rounds: Match[];
};
declare function databaseFileToTournamentParser(input: any): Tournament;
declare function roundCreatorBergerTables(teams: string[]): Match[];
export { Tournament, TournamentScoringSystem, Match, roundCreatorBergerTables, databaseFileToTournamentParser };
