const express = require('express');
const urllib = require('urllib');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const teamToIDs = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

const dreamTeam = [];

urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function(err, response){
    const data = JSON.parse(response.toString());
    router.get('/teams/:teamName', function(request, response) {
        if (!teamToIDs[request.params.teamName]) {
            response.send('invalid data');
            return;
        }
        const relData = data.league.standard.filter(d => d.teamId === teamToIDs[request.params.teamName] && d.isActive === true);
        filteredData = relData.map(d => {return {firstName: d.firstName, lastName: d.lastName, jersey: d.jersey, pos: d.pos}});
        response.send(filteredData);
    })
})

router.put('/team', function(req, res) {
    console.log('PUT is happening');
    const name = req.body.teamName;
    const id = req.body.teamId;
    teamToIDs[name] = id;
    res.end();
})

router.get('/dreamTeam', function(req, res) {
    if (!dreamTeam[0]) {
        res.send('invalid data');
        return;
    }
    console.log('getting dreamTeam');
    res.send(dreamTeam);
})

router.post('/roster', function(req, res) {
    console.log('adding a player');
    const obj = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jersey: req.body.jersey,
        pos: req.body.pos,
    }
    if(dreamTeam.some(d => d.firstName === obj.firstName) && dreamTeam.some(d => d.lastName === obj.lastName)) {
        return;
    }
    dreamTeam.push(obj);
    console.log(`new obj: ${obj}`);
    console.log(`dreamTeam: ${dreamTeam}`);
    res.end();
})

router.delete('/roster/:name', function(req, res) {
    const name = req.params.name;
    console.log('DELETE is happening');
    const nameArr = name.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr[1];
    let playerObj = dreamTeam.findIndex(d => d.firstName === firstName && d.lastName === lastName);
    dreamTeam.splice(playerObj, 1);
    res.send(dreamTeam);
})

module.exports = router