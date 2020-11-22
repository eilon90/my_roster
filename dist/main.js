$('#getTeam').on('click', function() {
    const name = $('#input').val();
    const url = `/teams/${name}`;
    apiManager.getData(url, rendererTeam.render, name, rendererTeam.wrongData);
    $('#input').val('');
});

$('#dream-team-button').on('click', function() {
    const url = '/dreamTeam';
    apiManager.getData(url, rendererDream.render, 'Your Dream Team', rendererTeam.noDream);
});

$('#teams-container').on('click', '.player', function() {
    const name = $(this).find('.name').text();
    const nameArr = name.split(' ');
    const chosenPlayer = {
        firstName: nameArr[0], 
        lastName: nameArr[1],
        jersey: $(this).find('.jersey').text(),
        pos: $(this).find('.pos').text()
    }
    apiManager.sendPlayer(chosenPlayer);
})

$('#dream-container').on('mouseenter', '.player', function() {
    rendererDream.deleteOption($(this));
})

$('#dream-container').on('mouseleave', '.player', function() {
    const url = '/dreamTeam';
    apiManager.getData(url, rendererDream.render, 'Your Dream Team', rendererTeam.noDream);
})

$('#dream-container').on('click', '.player', function() {
    const name = $(this).find('.name').text();
    apiManager.deletePlayer(name);
})