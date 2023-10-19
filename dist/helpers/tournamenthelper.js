"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundCreatorBergerTables = void 0;
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
    return matches;
}
exports.roundCreatorBergerTables = roundCreatorBergerTables;
