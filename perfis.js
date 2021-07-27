const database = require('./database') 
let acc_perfis;

function criarPerfil(){
  var aux = document.getElementById("imagem")
  var altura = aux.height;
  var geral = document.createElement("div");
  geral.className = "col";
  var thumb = document.createElement("div");
  thumb.className = "thumbnail";
  var centro = document.createElement("div");
  centro.className = "text-center"
  var linkperf = document.createElement("a");
  linkperf.href = "home.html";
  linkperf.target = "_blank";
  var foto = document.createElement("img");
  foto.src = "https://image.flaticon.com/icons/png/512/2232/2232231.png";
  foto.className = "w-50";
  foto.height = altura;
  var nome = document.getElementById("nome_perfil").value;
  var principal = document.getElementById("perfis");
  var nomeedit = document.createElement("h5");
  nomeedit.textContent = nome;
  linkperf.appendChild(foto);
  centro.appendChild(linkperf);
  centro.appendChild(document.createElement("div"));
  centro.appendChild(nomeedit);
  thumb.appendChild(centro);
  geral.appendChild(thumb);

  var addperfil = document.getElementById("addperfil")
  principal.insertBefore(geral, addperfil);
}

async function registerProfile(id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let profile_name = document.getElementById("nome_perfil").value

    // Verificação de conta
    let hasProfile = false
    let check_profile = await database.query("SELECT * FROM dataflix.perfil WHERE idconta = ($1)",[id])
    if (check_profile.rows.length === 0) console.log("A conta ainda não possui nenhum perfil...")
    else {
      hasProfile = true
      console.log("A conta já possui pelo menos um perfil cadastrado...")
    }

    // Verificação de perfil
    if (hasProfile == true) {
      let search_profile = await database.query("SELECT * FROM dataflix.perfil WHERE nome = $1 AND idconta = $2", [profile_name, id])
      if (search_profile.rows.length === 0) {
        console.log("É possível cadastrar um novo perfil para esta conta...")
        let add_profile = await database.query("INSERT INTO dataflix.perfil VALUES ($1, $2)", [profile_name, id])
        console.log("Foi adicionado um novo perfil à conta...")
      }
      else console.log("Já existe um perfil idêntico cadastrado para essa conta...")
    }
    else if (hasProfile == false) {
      let new_profile = await database.query("INSERT INTO dataflix.perfil VALUES ($1, $2)", [profile_name, id])
      console.log("Foi adicionado o primeiro perfil à conta...")
    }
  } 
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getProfiles(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de perfil
    let hasProfile = false
    let check_profile = await database.query("SELECT * FROM dataflix.perfil WHERE idconta = ($1)", [acc_id])
    if (check_profile.rows.length === 0) console.log("A conta ainda não possui nenhum perfil...")
    else {
      hasProfile = true
      console.log("A conta já possui pelo menos um perfil cadastrado...")
    }

    // Buscando perfis
    if (hasProfile == true) {
      let get_profile = await database.query("SELECT * FROM dataflix.perfil WHERE idconta = ($1)", [acc_id])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_profile.rows)

      // Coletando os campos
      let profiles_rows = []
      profiles_rows.push(get_profile.rows)
      let profiles_data = []
      profiles_data.push(profiles_rows[0])

      // Retornando os dados
      let profiles = profiles_data[0]
      console.log("Retornando a lista de perfis...")
      console.log(profiles)
      acc_perfis = profiles.toString
    }
    else if (hasProfile == false) console.log("Não foi possível efetuar a busca...")

  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setProfile(acc_id, old_name, new_name) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de perfil
    let hasProfile = false
    let check_profile = await database.query("SELECT * FROM dataflix.perfil WHERE idconta = ($1) AND nome = ($2)",[acc_id, old_name])
    if (check_profile.rows.length === 0) console.log("A conta ainda não possui nenhum perfil...")
    else {
      hasProfile = true
      console.log("A conta já possui pelo menos um perfil cadastrado...")
    }

    // Editar perfil
    if (hasProfile == true) {
      await database.query("UPDATE dataflix.perfil SET nome = $1 WHERE idconta = $2", [new_name, acc_id])
      console.log("Perfil atualizado com sucesso...")
    }
    else if (hasProfile == false) console.log("Não foi possível atualizar o perfil...")
  } 
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeProfile(acc_id, p_name) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de perfil
    let hasProfile = false
    let check_profile = await database.query("SELECT * FROM dataflix.perfil WHERE idconta = ($1) AND nome = ($2)",[acc_id, p_name])
    if (check_profile.rows.length === 0) console.log("A conta ainda não possui nenhum perfil...")
    else {
      hasProfile = true
      console.log("A conta já possui pelo menos um perfil cadastrado...")
    }
    
    // Removendo perfil
    if (hasProfile == true) {
      await database.query("DELETE FROM dataflix.perfil WHERE idconta = $1 AND nome = $2", [acc_id, p_name])
      console.log("Perfil removido com sucesso...")
    }
    else if (hasProfile == false) console.log("Não foi possível remover o perfil...")
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
// registerProfile(2)
// getProfiles(0)
// setProfile(0, "Gabi", "Ayrton")
// removeProfile(0, "Ayrton")