$("#botao-frase").click(fraseAleatoria);

function fraseAleatoria(){
    $.get("http://localhost:3000/frases", trocaFraseAleatoria);
        //A função fraseAleatoria será a responsável por fazer uma requisição ao nosso servidor (http://localhost:3000/frases) e pegar uma frase, para podermos modificar oHTML da nossa página com essa nova frase.
}

function trocaFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);

    frase.text(data[numeroAleatorio].texto);
}

 