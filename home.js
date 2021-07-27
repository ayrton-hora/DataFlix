import * as db_titulo from "./titulo"
import * as db_episodio from "./episodio"

listaFilmes = []
listaSeries = []
// var titulo = 'Joker'
// var ano = '2019'
// var desc = '(IMDB) - In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.'
// listaFilmes.push({titulo: titulo, ano: ano, desc: desc})

function addFilmes() {
    //Percorre a lista de filmes
    for(var x = 0; x < listaFilmes.length; x++){
        //Cria uma aba para cada filme
        var tabelaFilmes = document.getElementById("filmes")
        var coluna = document.createElement("div")
        coluna.className = "col-6"        
        var bordacoluna = document.createElement("div")
        bordacoluna.className = "p-3 border"
        var titulo = document.createElement("h1")
        titulo.textContent = listaFilmes[0].titulo
        bordacoluna.appendChild(titulo)
        var ano = document.createElement("p")
        ano.textContent = listaFilmes[0].ano
        bordacoluna.appendChild(ano)
        var classi = document.createElement("p")
        var sinop = document.createElement("p")
        sinop.textContent = listaFilmes[0].desc
        bordacoluna.appendChild(sinop)
        coluna.appendChild(bordacoluna)
        tabelaFilmes.appendChild(coluna)
    }
}

function addSeries(){
    //Percorre a lista de series
    for(var x = 0; x < listaFilmes.length; x++){
        //Cria uma aba para cada series
        var tabelaSeries = document.getElementById("series")
        var coluna = document.createElement("div")
        coluna.className = "col-6"        
        var bordacoluna = document.createElement("div")
        bordacoluna.className = "p-3 border"
        var titulo = document.createElement("h1")
        titulo.textContent = listaFilmes[0].titulo
        bordacoluna.appendChild(titulo)
        var ano = document.createElement("p")
        ano.textContent = listaFilmes[0].ano
        bordacoluna.appendChild(ano)
        var sinop = document.createElement("p")
        sinop.textContent = listaFilmes[0].desc
        bordacoluna.appendChild(sinop)
        coluna.appendChild(bordacoluna)
        tabelaFilmes.appendChild(coluna)
    }
}

