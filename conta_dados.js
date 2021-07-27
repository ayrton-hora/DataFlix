import * as db_conta from "./conta"
import * as db_dispositivos from "./dispositivos"
import * as db_perfis from "./perfis"
import * as db_cartao_credito from "./cartao_credito"

// Recebe a lista com as consultas ao B.D
lst_dados = showData_html;
lst_dispositivos = acc_devices;
lst_perfis = acc_perfis;
lst_cartao = acc_credit_card;

// Adiciona aos campos da página, os dados da conta
function addDados() {
  var membro_desde = document.getElementById("membro")
  membro_desde.innerHTML+= " " + lst_dados[0]

  var nome_completo = document.getElementById("nomecompleto").value
  nome_completo = lst_dados[1]
  
  var cpf = document.getElementById("contacpf").value
  cpf = lst_dados[2]

  var email = document.getElementById("contaemail").value
  email = lst_dados[3]
    
  var telefone = document.getElementById("contatelefone").value
  telefone = lst_dados[4]
    
  var senha = document.getElementById("contasenha").value
  senha = lst_dados[5]
}

// Adiciona à página os dispositivos da conta
function addDispositivos() {
  var dispositivos = document.getElementById("contadispositivos")
  dispositivos.innerHTML += "<br>" + lst_dispositivos
}

// Adiciona à página os perfis da conta
function addPerfis() {
  var dispositivos = document.getElementById("contaperfis")
  dispositivos.innerHTML += "<br>" + lst_perfis
}

// Adiciona à conta o cartão de crédito cadastrado
function addCartao() {
  var dispositivos = document.getElementById("contacartao")
  dispositivos.innerHTML += "<br>" + lst_cartao
}
