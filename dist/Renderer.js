class Renderer {
    constructor(container) {
        this.container = container;
    }
    render = (data, name) => {
        $(`${this.container}`).empty();
        $(`${this.container}`).closest('.team').find('h1').text(name);
        const source = $('#my-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({data});
        $(`${this.container}`).append(newHTML);
        $('img').attr('onerror', "this.src='https://upload.wikimedia.org/wikipedia/he/0/07/NBALogo.svg'; $(this).attr('class', 'error');")

    }

    wrongData() {
        $('#teams-container').empty();
        $('#team-name').text('');
        const invalid = $('<h4 id = "invalid">please type a valid NBA team name</h4>');
        $('#teams-container').append(invalid);
    }

    noDream() {
        $('#dream-container').empty();
        $('#dream-team-name').text('');
        const invalid = $('<h4 id = "invalid">Did you choose any player?</h4>');
        $('#dream-container').append(invalid);
    }

    deleteOption(div) {
        const source = $('#delete-template').html();
        const template = Handlebars.compile(source);
        const newHTML = template({delete: 'Delete'});
        div.append(newHTML);
    }

    deletePlayer() {
        
    }
}

const rendererTeam = new Renderer('#teams-container');
const rendererDream = new Renderer('#dream-container');