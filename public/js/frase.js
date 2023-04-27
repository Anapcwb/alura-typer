$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();
    $.get("http://localhost:3001/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
        //A função fraseAleatoria será a responsável por fazer uma requisição ao nosso servidor (http://localhost:3000/frases) e pegar uma frase, para podermos modificar oHTML da nossa página com essa nova frase.
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
}

function buscaFrase(){
    $("#spinner").toggle();
    var fraseId = $("#frase-id").val();
    console.log("id da minha frase")
    var dados = {id: fraseId};

    $.get("http://localhost:3001/frases",dados,trocaFrase)
    .fail(function(){
        $("#erro").toggle();
        setTimeout(function(){
            $("#erro").toggle();
        }, 2000);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocaFrase(data){
    var frase = $(".frase");
    frase.text(data.texto);
    atualizaTamanhoFrase();
    atualizaTempoInicial(data.tempo);
}