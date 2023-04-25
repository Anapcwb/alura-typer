var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanhoFrase");
tamanhoFrase.text(numPalavras)


var campo = $(".campo-digitacao");
campo.on("input",function(){
    var conteudo = campo.val();

    var qtdPalavras = conteudo.split(/\S+/).length -1;
    $("#contador-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-caracteres").text(qtdCaracteres);

    console.log(qtdPalavras);
    console.log(qtdCaracteres);
});




