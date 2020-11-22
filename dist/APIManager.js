class APIManager {

    getData(urlAdd, func, name, wrongData) {
        $.ajax({
            method: 'GET',
            url: urlAdd,
            success: (data) => {
                if (data === 'invalid data') {
                    wrongData();
                    return;
                }   
                func(data, name);
            },
            error: function(xhr, text, error) {
                console.log(text);
                wrongData();
            } 
        })
    }

    sendPlayer(player) {
        $.post('/roster', player, function(res) {
        })
    }

    deletePlayer(name) {
        $.ajax({
            method: 'DELETE',
            url: `/roster/${name}`,
            success: data => {  
                const url = '/dreamTeam';
                this.getData(url, rendererDream.render, 'Your Dream Team', rendererTeam.noDream);
            },
            error: function(xhr, text, error) {
                console.log(text);
            }
        }) 
    }

}

const apiManager = new APIManager;