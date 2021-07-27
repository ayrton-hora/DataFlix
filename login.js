const database = require('./database') 

async function connectDB() {
  try {
    window.location.replace("perfis.html")

    // // Conexão
    // await database.connect()
    // console.log("Conexão estabelecida com o Banco de Dados...")

    // // Autenticação
    // let email = document.getElementById("login_email").value
    // let password = document.getElementById("login_senha").value
    // let search_account = await database.query("SELECT * FROM dataflix.conta WHERE email = $1 AND senha = $2", [email, password])
    
    // // Verificação da consulta
    // if (search_account.rows.length === 0) console.log("Falha na autenticação...")
    // else {
    //   console.log("Autenticado com sucesso...")
    //   window.location.replace("perfis.html")
    // }
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
// connectDB()