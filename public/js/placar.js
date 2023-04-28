$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();

    var linha = novaLinha(usuario,numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    corpoTabela.append(linha);

    $(".placar").slideDown(500); // nova linha
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario,palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remover").attr("href","#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

// funcao responsavel por remover um elemento
function removeLinha(){
    event.preventDefault();
    var linha =  $(this).parent().parent();
    linha.fadeOut(1000);// o fadeOut vai removendo a opacidade do elemento até um ponto e depois modifica a sua propriedade display, fazendo com que o elemento desapareça da tela, mas continue no HTML.
    setTimeout(function(){ //a funcao setTimeout vai fazer com que o fadeOut aconteca antes da linha ser removida em linha.remove().
        linha.remove();
    },1000);
}

// Como alternar entre as funções slideDown e slideUp com a função slideToggle
function mostraPlacar(){
    $(".placar").stop().slideToggle(600);//A função stop controla melhor as nossas animações. Neste caso se o usuario clicar varias vezes no boao mostrarPlacar o placar nao vai aparecer e sumir varias vezes e sim ele vai assumir o ultimo click.
}

function sincronizaPlacar(){
   var placar = []; //pegamos o placar e criei um array
   var linhas = $("tbody>tr"); //como o arrey objtive as linhas da tabela
   linhas.each(function(){ //iterei as linhas pegando o numero de usuarios e palavras
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();
        
        var score = { //objeto javascript onde salvei 
            usuario: usuario,
            pontos: palavras
        };
        placar.push(score); //inseri o objeto js dentro do array placar
        
   });
  
   var dados = { //inseri o array placar neste objeto js chamado dados
    placar: placar 
   };

   $.post("http://localhost:3000/placar",dados, function(){ //envia atraves de uma requisicao post para o servidor no endereco indicado
    console.log("salvou o placar");
   });
}

function atualizaPlacar(){

   $.get("http://localhost:3000/placar",function(data){ 
        console.log("placar atualizado")
        $(data).each(function(){
            var linha = novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        });  
});
}