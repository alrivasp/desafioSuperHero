$(document).ready(function(){
    let submit = $('#submit');

    submit.click( function(event){
        event.preventDefault();

        let id_input = $('#id-hero').val();

        if (validationInput(id_input)) {
            cleanInput();
            let response = requestSuperHero(id_input);
        }
    });
});

const validationInput = (id_input) =>{
    let result = true;
    let id = parseInt(id_input);
    let helperError = $('#idHeroHelp');
    helperError.text('');
    outCard();

    if (Number.isNaN(id)) {
        helperError.text('!!! Debe ingresar una Id de Super heroe valida');
        helperError.css('color','red');
        helperError.css('font-weight','700');
        result = false;
    }
    else if (id < 0) {
        helperError.text('!!! Debe ingresar una Id de Super heroe mayor a 0');
        helperError.css('color','red');
        helperError.css('font-weight','700');
        result = false;
    }
    else if (id > 731) {
        helperError.text('!!! Debe ingresar una Id de Super heroe menor a 731');
        helperError.css('color','red');
        helperError.css('font-weight','700');
        result = false;
    }
    return result;
};

const cleanInput = () =>{
    let input = $('#id-hero');
    input.val('');
};

const outCard = () =>{
    $('#container-card-hero').hide('slow');
}

const inCard = () =>{
    $('#container-card-hero').show('slow');
}

const requestSuperHero = (id_input) => {
    let tokken = '10226125410462284'
    let id = id_input
    let uri = `https://www.superheroapi.com/api.php/${tokken}/${id}`

    $.ajax({
            type:"GET",
            url: uri,
            dataType:"json",
            success: function(response){
                buildCard(response);
            },
            error: function(response){
                console.log('error');
                console.log(response);
            },
    });
};

const buildCard = (data) => {
    //title
    $('#title-article').text(data.name);
    $('#title-article').show('fast');
    //image
    $('#image-super-hero').attr('src',data.image.url);
    $('#image-super-hero').css('width','15rem');
    $('#image-super-hero').css('height','auto');
    //detail
    $('#nameCard').text(data.name); 
    $('#conectionsCard').text(data.connections["group-affiliation"]);
    $('#publishedCard').text(data.biography["publisher"]);
    $('#ocupationCard').text(data.work["occupation"]);
    $('#firstAparitionCard').text(data.biography["first-appearance"]);
    $('#higthCard').text(data.appearance["height"][1]);
    $('#weithCard').text(data.appearance["weight"][1]);
    $('#alianceCard').text(data.biography["aliases"]);
    //canvas
    buildCanvas(data.powerstats, data.name);
    inCard();
};

const buildCanvas = (data, nameHero) => {
    var dataPoints = [];

    for(var i in data){
        dataPoints.push({
            label: i,
            y: data[i]
        });
    }
 
    var options = {
        title: {
            text: `Estadisticas de Poder para ${nameHero}`
        },
        data: [{
                type: "pie",
                startAngle: 45,
                showInLegend: "true",
                legendText: "{label}",
                indexLabel: "{label} ({y})",
                yValueFormatString:"#,##0.#"%"",
                dataPoints: dataPoints
        }]
    };

    $( "#chartContainer" ).CanvasJSChart(options);
};