$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
    $("#spinner").show();

    $.get("http://localhost:3000/frases", trocaFraseAleatoria)
    .fail(function(){
        $("#erro").show();
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

