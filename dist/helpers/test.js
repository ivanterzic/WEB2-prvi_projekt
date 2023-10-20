var example = {
    tournamentid: 2,
    tournamentcreator: 'phmBKOLPq5vaLpFrzqH73J1Q6bZ4zq_R',
    tournamentname: 'Premier Liga',
    competitors: 'Brighton,Newcastle United,Aston Villa,Arsenal,Spurs',
    scoringsystem: '{"winPoints":3,"drawPoints":1,"lossPoints":0}',
    rounds: '[{"round":1,"team1":"Brighton","scoreTeam1":null,"scoreTeam2":null},{"round":1,"team1":"Newcastle United","team2":"Spurs","scoreTeam1":null,"scoreTeam2":null},{"round":1,"team1":"Aston Villa","team2":"Arsenal","scoreTeam1":null,"scoreTeam2":null},{"round":2,"team2":"Arsenal","scoreTeam1":null,"scoreTeam2":null},{"round":2,"team1":"Spurs","team2":"Aston Villa","scoreTeam1":null,"scoreTeam2":null},{"round":2,"team1":"Brighton","team2":"Newcastle United","scoreTeam1":null,"scoreTeam2":null},{"round":3,"team1":"Newcastle United","scoreTeam1":null,"scoreTeam2":null},{"round":3,"team1":"Aston Villa","team2":"Brighton","scoreTeam1":null,"scoreTeam2":null},{"round":3,"team1":"Arsenal","team2":"Spurs","scoreTeam1":null,"scoreTeam2":null},{"round":4,"team2":"Spurs","scoreTeam1":null,"scoreTeam2":null},{"round":4,"team1":"Brighton","team2":"Arsenal","scoreTeam1":null,"scoreTeam2":null},{"round":4,"team1":"Newcastle United","team2":"Aston Villa","scoreTeam1":null,"scoreTeam2":null},{"round":5,"team1":"Aston Villa","scoreTeam1":null,"scoreTeam2":null},{"round":5,"team1":"Arsenal","team2":"Newcastle United","scoreTeam1":null,"scoreTeam2":null},{"round":5,"team1":"Spurs","team2":"Brighton","scoreTeam1":null,"scoreTeam2":null}]'
};
function f2(input) {
    var newTour = {
        tournamentId: Number(input["tournamentid"]),
        tournamentCreator: input["tournamentcreator"],
        competitionName: input["tournamentname"],
        competitors: input["competitors"].split(","),
        scoringSystem: JSON.parse(input["scoringsystem"]),
        rounds: JSON.parse(input["rounds"]),
    };
    return newTour;
}
console.log(f2(example));
