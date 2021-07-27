const database = require('./database') 
let acc_credit_card;

async function cardsNumber() {
  try {
    let search_cards = await database.query("SELECT * FROM dataflix.cartao_de_credito")
    if (search_cards.rows.length === 0) return 0
    else return search_cards.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerCreditCard(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let card_id = await cardsNumber()
    let number = 1111111111111111
    let name = "Ayrton Hora"
    let month = 01
    let year = 2028
    let now_date = new Date()
    let creatin_date = now_date.getFullYear()+'-'+(now_date.getMonth()+1)+'-'+now_date.getDate() 

    // Verificação de conta 
    let hasCreditCard = false
    let check_account = await database.query("SELECT * FROM dataflix.cartao_de_credito WHERE idconta = ($1)",[acc_id])
    if (check_account.rows.length === 0) console.log("A conta ainda não possui nenhum cartão de crédito cadastrado...")
    else {
      hasCreditCard = true
      console.log("A conta já possui um cartão de crédito cadastrado...")
    }

    // Adicionando o cartão de crédito
    if (hasCreditCard == false) {
      let new_card = await database.query("INSERT INTO dataflix.cartao_de_credito VALUES ($1, $2, $3, $4, $5, $6, $7)", [card_id, acc_id, number, name, month, year, creatin_date])
      console.log("Foi adicionado um cartão de crédito à conta...")
    }
    else console.log("Não é possível cadastrar mais um cartão de crédito...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getCreditCard(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de conta 
    let hasCreditCard = false
    let check_account = await database.query("SELECT * FROM dataflix.cartao_de_credito WHERE idconta = ($1)",[acc_id])
    if (check_account.rows.length === 0) console.log("A conta ainda não possui nenhum cartão de crédito cadastrado...")
    else {
      hasCreditCard = true
      console.log("A conta possui um cartão de crédito cadastrado...")
    }

    // Buscando cartão de crédito
    if (hasCreditCard == true) {
      let get_card = await database.query("SELECT * FROM dataflix.cartao_de_credito WHERE idconta = ($1)", [acc_id])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_card.rows)
      
      // Coletando os campos
      let card_rows = []
      card_rows.push(get_card.rows)
      let card_data = []
      card_data.push(card_rows[0])
      
      // Retornando os dados
      let credit_card = card_data[0]
      console.log("Retornando dados do cartão de crédito...")
      acc_credit_card = credit_card.toString
    }
    else if (hasCreditCard == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    console.log("Encerrando busca por cartão de crédito...")
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setCreditCard(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let new_number = 2222222222222222
    let new_name = "Ayrton F. Hora"
    let new_month = 02
    let new_year = 2022
    let now_date = new Date()
    let creatin_date = now_date.getFullYear()+'-'+(now_date.getMonth()+1)+'-'+now_date.getDate() 

    // Verificação de conta 
    let hasCreditCard = false
    let check_account = await database.query("SELECT * FROM dataflix.cartao_de_credito WHERE idconta = ($1)",[acc_id])
    if (check_account.rows.length === 0) console.log("A conta ainda não possui nenhum cartão de crédito cadastrado...")
    else {
      hasCreditCard = true
      console.log("A conta possui um cartão de crédito cadastrado...")
    }

    // Editar cartão
    if (hasCreditCard == true) {
      await database.query("UPDATE dataflix.cartao_de_credito SET numero = $1, nome = $2, mes = $3, ano = $4, data_cadastro = $5 WHERE idconta = $6", [new_number, new_name, new_month, new_year, creatin_date, acc_id])
      console.log("Cartão de crédito atualizado com sucesso...")
    }
    else if (hasCreditCard == false) console.log("Não foi possível atualizar o cartão de crédito...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeCreditCard(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de conta 
    let hasCreditCard = false
    let check_account = await database.query("SELECT * FROM dataflix.cartao_de_credito WHERE idconta = ($1)",[acc_id])
    if (check_account.rows.length === 0) console.log("A conta ainda não possui nenhum cartão de crédito cadastrado...")
    else {
      hasCreditCard = true
      console.log("A conta possui um cartão de crédito cadastrado...")
    }
    
    // Removendo cartão de crédito
    if (hasCreditCard == true) {
      await database.query("DELETE FROM dataflix.cartao_de_credito WHERE idconta = ($1)", [acc_id])
      console.log("Cartão de crédito removido com sucesso...")
    }
    else if (hasCreditCard == false) console.log("Não foi possível remover o cartão de crédito...")

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
registerCreditCard(0)
// getCreditCard(0)
// setCreditCard(0)
// removeCreditCard(0)