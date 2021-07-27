const database = require('./database') 
let acc;
var showData_html = [acc[0].data_criacao, acc[0].primeiro_nome + acc[0].sobrenome, acc[0].cpf, acc[0].email, acc[0].telefone, acc[0].senha]

// (function checkForm () {
//   'use strict'
//   var forms = document.querySelectorAll('.needs-validation')
//   Array.prototype.slice.call(forms)
//     .forEach(function (form) {
//       form.addEventListener('submit', function(event) {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
          
//         }
//         form.classList.add('was-validated')
//       }, false)
//     })
// }) ()

// function checkPassword() {
//   let senha = document.getElementById("senha")
//   let senha_confir = document.getElementById("senha_confir")
//   if (senha.value != senha_confir.value) {
//     alert("As senhas não correspondem")
//     return false
//   }
//   senha_confir.onchange = validarSenha
//   return true
// }

async function accountsNumber() {
  try {
    let search_accounts = await database.query("SELECT * FROM dataflix.conta")
    if (search_accounts.rows.length === 0) return 0
    else return search_accounts.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerAccount() {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")
  
    // Autenticação do formulário
    // checkForm()

    // Dados
    let account_id = await accountsNumber()
    let fst_name = "José Arnaldo"
    let lst_name = "Junior"
    let email = "junior17@academico.ufs.br"
    let password = "dataflix_admin"
    let creatin_date = new Date()
    let now_date = creatin_date.getFullYear()+'-'+(creatin_date.getMonth()+1)+'-'+creatin_date.getDate()
    let cpf = "XXXXXXXXXXX"
    let birth_date = '2000-04-27'
    let gender = 'Masculino'
    let phone = 'XXXXXXX-XXXX'

    // let account_id = accountsNumber()
    // let fst_name = document.getElementById("primeiro_nome").value
    // let email = document.getElementById("email").value
    // let password = document.getElementById("senha").value
    // let creatin_date = new Date()
    // let now_date = creatin_date.getFullYear()+'-'+(creatin_date.getMonth()+1)+'-'+creatin_date.getDate() 
    // let cpf = getElementById("cpf").value
    // let birth_date = getElementById("data_nasc").value
    // let gender = getElementById("genero").value
    // let phone = getElementById("telefone").value

    // Verificação de conta
    let isRegistred = false
    let search_account = await database.query("SELECT * FROM dataflix.conta WHERE email = $1 AND senha = $2", [email, password])
    if (search_account.rows.length === 0) console.log("Conta ainda não está cadastrada...")
    else {
      isRegistred = true
      console.log("Conta já está cadastrada...")
    }

    // Cadastro de conta
    if (isRegistred == false) {
      await database.query("INSERT INTO dataflix.conta VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [account_id, fst_name, lst_name, email, password, now_date, cpf, birth_date, gender, phone])
      console.log("Conta cadastrada com sucesso...")
    }
    else if (isRegistred == true) console.log("Não foi possível cadastrar essa conta...")
  } 
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getAccount(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação da conta
    let hasAccount = false
    let check_account = await database.query("SELECT * FROM dataflix.conta WHERE idconta = $1", [acc_id])
    if (check_account.rows.length === 0) console.log("A conta não está cadastrada no sistema...")
    else {
      hasAccount = true
      console.log("A conta está cadastrada no sistema...")
    }

    // Buscando conta
    if (hasAccount == true) {
      let get_acc = await database.query("SELECT * FROM dataflix.conta WHERE idconta = $1", [acc_id])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_acc.rows)

      // Coletando os campos
      let acc_rows = []
      acc_rows.push(get_acc.rows)
      let acc_data = []
      acc_data.push(acc_rows[0])

      // Retornando os dados
      let account = acc_data[0]
      console.log("Retornando a conta...")
      console.log(account)
      acc = account
    }
    else if (hasAccount == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setAccount(acc_id, new_fstname, new_lstname, new_email, new_pass, new_phone, new_addres, new_postcode) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação da conta
    let hasAccount = false
    let check_account = await database.query("SELECT * FROM dataflix.conta WHERE idconta = $1", [acc_id])
    if (check_account.rows.length === 0) console.log("A conta não está cadastrada no sistema...")
    else {
      hasAccount = true
      console.log("A conta está cadastrada no sistema...")
    }

    // Editar conta
    if (hasAccount == true) {
      await database.query("UPDATE dataflix.conta SET primeiro_nome = $1, sobrenome = $2, email = $3, senha = $4, telefone = $5, endereco = $6, cep = $7 WHERE idconta = $8", [new_fstname, new_lstname, new_email, new_pass, new_phone, new_addres, new_postcode, acc_id])
      console.log("Conta atualizada com sucesso...")
    }
    else if (hasAccount == false) console.log("Não foi possível atualizar a conta...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeAccount(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação da conta
    let hasAccount = false
    let check_account = await database.query("SELECT * FROM dataflix.conta WHERE idconta = $1", [acc_id])
    if (check_account.rows.length === 0) console.log("A conta não está cadastrada no sistema...")
    else {
      hasAccount = true
      console.log("A conta está cadastrada no sistema...")
    }

    // Removendo a conta
    if (hasAccount == true) {
      await database.query("DELETE FROM dataflix.conta WHERE idconta = $1", [acc_id])
      console.log("Conta removida com sucesso...")
    }
    else if (hasAccount == false) console.log("Não foi possível remover o perfil...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

// Main
registerAccount()
// getAccount(0)
// setAccount(0, "Ayrton", "Hora", "ayrtonfh@gmail.com", "dataflix_admin", "YYYYYYY-YYYY", "", "")
// removeAccount(1)