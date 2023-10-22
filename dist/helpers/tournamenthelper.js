"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesToTableElement = exports.databaseFileToTournamentParser = exports.roundCreatorBergerTables = void 0;
var bergerTableFor4Players = [
    [[1, 4], [2, 3]],
    [[4, 3], [1, 2]],
    [[1, 3], [4, 2]]
];
var bergerTableFor5And6Players = [
    [[1, 6], [2, 5], [3, 4]],
    [[6, 4], [5, 3], [1, 2]],
    [[2, 6], [3, 1], [4, 5]],
    [[6, 5], [1, 4], [2, 3]],
    [[3, 6], [4, 2], [5, 1]]
];
var bergerTableFor7And8Players = [
    [[1, 8], [2, 7], [3, 6], [4, 5]],
    [[8, 5], [6, 4], [7, 3], [1, 2]],
    [[2, 8], [3, 1], [4, 7], [5, 6]],
    [[8, 6], [7, 5], [1, 4], [2, 3]],
    [[3, 8], [4, 2], [5, 1], [6, 7]],
    [[8, 7], [1, 6], [2, 5], [3, 4]],
    [[4, 8], [5, 3], [6, 2], [7, 1]]
];
function databaseFileToTournamentParser(input) {
    var newTour = {
        tournamentId: Number(input["tournamentid"]),
        tournamentCreator: input["tournamentcreator"],
        tournamentCreatorEmail: input["tournamentcreatoremail"],
        competitionName: input["tournamentname"],
        competitors: input["competitors"].split(","),
        scoringSystem: JSON.parse(input["scoringsystem"]),
        rounds: JSON.parse(input["rounds"]),
    };
    return newTour;
}
exports.databaseFileToTournamentParser = databaseFileToTournamentParser;
function roundCreatorBergerTables(teams) {
    var matches = [];
    var round = 1;
    if (teams.length == 3 || teams.length == 4) {
        for (var i = 0; i < bergerTableFor4Players.length; i++) {
            for (var j = 0; j < bergerTableFor4Players[i].length; j++) {
                matches.push({
                    round: round,
                    team1: teams[bergerTableFor4Players[i][j][0] - 1],
                    team2: teams[bergerTableFor4Players[i][j][1] - 1],
                    scoreTeam1: null,
                    scoreTeam2: null
                });
            }
            round++;
        }
    }
    else if (teams.length == 5 || teams.length == 6) {
        for (var i = 0; i < bergerTableFor5And6Players.length; i++) {
            for (var j = 0; j < bergerTableFor5And6Players[i].length; j++) {
                matches.push({
                    round: round,
                    team1: teams[bergerTableFor5And6Players[i][j][0] - 1],
                    team2: teams[bergerTableFor5And6Players[i][j][1] - 1],
                    scoreTeam1: null,
                    scoreTeam2: null
                });
            }
            round++;
        }
    }
    else if (teams.length == 7 || teams.length == 8) {
        for (var i = 0; i < bergerTableFor7And8Players.length; i++) {
            for (var j = 0; j < bergerTableFor7And8Players[i].length; j++) {
                matches.push({
                    round: round,
                    team1: teams[bergerTableFor7And8Players[i][j][0] - 1],
                    team2: teams[bergerTableFor7And8Players[i][j][1] - 1],
                    scoreTeam1: null,
                    scoreTeam2: null
                });
            }
            round++;
        }
    }
    var returnMatches = [];
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var match = matches_1[_i];
        if (match["team1"] != null && match["team2"] != null)
            returnMatches.push(match);
    }
    return returnMatches;
}
exports.roundCreatorBergerTables = roundCreatorBergerTables;
function matchesToTableElement(matches, teams) {
    var table = [];
    for (var _i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
        var team = teams_1[_i];
        table.push({
            team: team,
            gamesPlayed: 0,
            wins: 0,
            draws: 0,
            losses: 0,
            goalsFor: 0,
            goalsAgainst: 0,
            goalDifference: 0,
            points: 0,
        });
    }
    var _loop_1 = function (match) {
        if (match.scoreTeam1 != null && match.scoreTeam2 != null) {
            var team1 = table.find(function (element) { return element.team == match.team1; });
            var team2 = table.find(function (element) { return element.team == match.team2; });
            if (team1 && team2) {
                team1.gamesPlayed += 1;
                team2.gamesPlayed += 1;
                team1.goalsFor += match.scoreTeam1;
                team1.goalsAgainst += match.scoreTeam2;
                team1.goalDifference = team1.goalsFor - team1.goalsAgainst;
                team2.goalsFor += match.scoreTeam2;
                team2.goalsAgainst += match.scoreTeam1;
                team2.goalDifference = team2.goalsFor - team2.goalsAgainst;
                if (match.scoreTeam1 > match.scoreTeam2) {
                    team1.points += 3;
                    team1.wins += 1;
                    team2.losses += 1;
                }
                else if (match.scoreTeam1 < match.scoreTeam2) {
                    team2.points += 3;
                    team2.wins += 1;
                    team1.losses += 1;
                }
                else if (match.scoreTeam1 == match.scoreTeam2) {
                    team1.points += 1;
                    team2.points += 1;
                    team1.draws += 1;
                    team2.draws += 1;
                }
            }
        }
    };
    for (var _a = 0, matches_2 = matches; _a < matches_2.length; _a++) {
        var match = matches_2[_a];
        _loop_1(match);
    }
    table.sort(function (a, b) {
        if (a.points > b.points) {
            return -1;
        }
        else if (a.points < b.points) {
            return 1;
        }
        else {
            if (a.goalDifference > b.goalDifference) {
                return -1;
            }
            else if (a.goalDifference < b.goalDifference) {
                return 1;
            }
            else {
                if (a.goalsFor > b.goalsFor) {
                    return -1;
                }
                else if (a.goalsFor < b.goalsFor) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
        }
    });
    return table;
}
exports.matchesToTableElement = matchesToTableElement;
