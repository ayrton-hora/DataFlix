const {Client} = require('pg')
const client = new Client({
  user: "ayrtonhora",
  password: "2+5_afh250920_database_ufs",
  host: "ayrtonhora-database1ufs.c1nw3oxidazm.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "banco_de_dados_2020.2",
})

// Global
let acc_user;
let db_admins;
let db_operators;

async function systemUsersNumber() {
  try {
    let search_users = await client.query("SELECT * FROM dataflix.usuario_sistema")
    if (search_users.rows.length === 0) return 0
    else return search_users.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function adminsNumber() {
  try {
    let search_users = await client.query("SELECT * FROM dataflix.administrador")
    if (search_users.rows.length === 0) return 0
    else return search_users.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function usersNumber() {
  try {
    let search_users = await client.query("SELECT * FROM dataflix.operador")
    if (search_users.rows.length === 0) return 0
    else return search_users.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerUser(admin) {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")
    
    // Dados
    let password = "dataflix_admin"
    let user_name = "professorbd"

    // Verificando se o usuário existe no banco de dados
    let isnewUser = false
    let search_user = await client.query("SELECT * FROM dataflix.usuario_sistema WHERE senha = $1 AND nome = $2", [password, user_name])
    if (search_user.rows.length !== 0) console.log("Usuário já cadastrado...")
    else {
      isnewUser = true
      console.log("Usuário ainda não cadastrado...")
    }

    // Definindo tipo de usuário e inserindo
    // Cadastro administrador
    if (isnewUser == true && admin == true) {
      let account_id = await systemUsersNumber()
      let admin_id = await adminsNumber()
      let new_user_admin = await client.query("INSERT INTO dataflix.usuario_sistema VALUES ($1, $2, $3)", [account_id, password, user_name])
      let new_admin_table = await client.query("INSERT INTO dataflix.administrador VALUES ($1)", [admin_id])
      let new_mantem_table = await client.query("INSERT INTO dataflix.mantem VALUES ($1, $2)", [account_id, admin_id])
      console.log("Administrador cadastrado com sucesso...")
    }
    // Cadastro operador
    else if (isnewUser == true && admin == false) {
      let account_id = await systemUsersNumber()
      let operator_id = await usersNumber()
      let new_user_operator = await client.query("INSERT INTO dataflix.usuario_sistema VALUES ($1, $2, $3)", [account_id, password, user_name])
      let new_operator_table = await client.query("INSERT INTO dataflix.operador VALUES ($1)", [account_id])
      console.log("Operador cadastrado com sucesso...")
    }
    // Em caso de erro
    else console.log("Não é possível cadastrar esse usuário...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getUser(acc_id) {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação do usuário
    let hasUser = false 
    let check_user = await client.query("SELECT * FROM dataflix.usuario_sistema WHERE login = $1", [acc_id])
    if (check_user.rows.length === 0) console.log("O usuário não está cadastrado no sistema...")
    else {
      hasUser = true
      console.log("O usuário está cadastrado no sistema...")
    }

    // Buscando usuário
    if (hasUser == true) {
      let get_user = await client.query("SELECT * FROM dataflix.usuario_sistema WHERE login = $1", [acc_id])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_user.rows)
      
      // Coletando os campos
      let user_rows = []
      user_rows.push(get_user.rows)
      let user_data = []
      user_data.push(user_rows[0][0])

      // Retornando os dados
      let user = user_data[0]
      console.log("Retornando o perfil...")
      console.log(user)
      acc_user = user
    }
    else if (hasUser == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getAdmins() {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação dos administradores
    let haveAdmins = false 
    let check_admins = await client.query("SELECT * FROM dataflix.administrador")
    if (check_admins.rows.length === 0) console.log("Não existem administradores cadastrados no sistema...")
    else {
      haveAdmins = true
      console.log("Existe pelo menos um administrador cadastrado no sistema...")
    }

    // Buscando administradores
    if (haveAdmins == true) {
      let get_admins = await client.query("SELECT * FROM dataflix.administrador")
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_admins.rows)

      // Coletando os campos
      let admins_rows = []
      admins_rows.push(get_admins.rows)
      let admins_data = []
      admins_data.push(admins_rows[0])

      // Retornando os dados
      let admins = admins_data[0]
      console.log("Retornando a lista de administradores...")
      console.log(admins)
      db_admins = admins
    }
    else if (haveAdmins == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getOperators() {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação dos operadores
    let haveOperators = false
    let check_operators = await client.query("SELECT * FROM dataflix.operador")
    if (check_operators.rows.length === 0) console.log("Não existem operadores cadastrados no sistema...")
    else {
      haveOperators = true
      console.log("Existe pelo menos um operador cadastrado no sistema...")
    }

    // Buscando operadores
    if (haveOperators == true) {
      let get_operators = await client.query("SELECT * FROM dataflix.operador")
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_operators.rows)

      // Coletando os campos
      let operators_rows = []
      operators_rows.push(get_operators.rows)
      let operators_data = []
      operators_data.push(operators_rows[0])

      // Retornando os dados
      let operators = operators_data[0]
      console.log("Retornando a lista de operadores...")
      console.log(operators)
      db_operators = operators
    }
    else if (haveOperators == false) console.log("Não foi possível efetuar a busca...")

  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setUser(acc_id, new_name, new_password) {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação do usuário
    let hasUser = false 
    let check_user = await client.query("SELECT * FROM dataflix.usuario_sistema WHERE login = $1", [acc_id])
    if (check_user.rows.length === 0) console.log("Usuário não está cadastrado no sistema...")
    else {
      hasUser = true
      console.log("O usuário está cadastrado no sistema...")
    }

    // Editar usuário
    if (hasUser == true) {
      await client.query("UPDATE dataflix.usuario_sistema SET senha = $1, nome = $2 WHERE login = $3", [new_password, new_name, acc_id])
      console.log("Usuário atualizado com sucesso...")
    }
    else if (hasUser == false) console.log("Não foi possível atualizar o usuário...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeUser(acc_id, usr_name) {
  try {
    // Conexão
    await client.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação do usuário
    let hasUser = false 
    let check_user = await client.query("SELECT * FROM dataflix.usuario_sistema WHERE login = $1 AND nome = $2", [acc_id, usr_name])
    if (check_user.rows.length === 0) console.log("Usuário não está cadastrado no sistema...")
    else {
      hasUser = true
      console.log("O usuário está cadastrado no sistema...")
    }

    // Removendo o usuário
    if (hasUser == true) {
      await client.query("DELETE FROM dataflix.usuario_sistema WHERE login = $1 AND nome = $2", [acc_id, usr_name])
      console.log("Usuário removido com sucesso...")
    }
    else if (hasUser == false) console.log("Não foi possível remover o perfil...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await client.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

// Main
registerUser(false)
// getUser(0)
// getAdmins()
// getOperators()
// setUser(0, "Ayrton F Hora", "dataflix_admin1")
// removeUser(0, "Ayrton Hora")