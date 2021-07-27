const database = require('./database') 
let db_episode;
let db_episodes;

async function episodeNumber() {
  try {
    let search_episode = await database.query("SELECT * FROM dataflix.episodio")
    if (search_episode.rows.length === 0) return 0
    else return search_episode.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerEpisode(epTittle_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let episode_id = await episodeNumber()
    let tittle = "Ep 01"
    let synopsis = "Its me, Wanda"
    let season = 1

    // Verificação dos episódios
    let hasEpisodes = false 
    let check_episodes = await database.query("SELECT * FROM dataflix.episodio")
    if (check_episodes.rows.length === 0) console.log("Não existem episódios cadastrados...")
    else {
      hasEpisodes = true
      console.log("Existe pelo menos um episódio cadastrado...")
    }

    // Verificação de episódio já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.episodio WHERE titulo = $1 AND idtitulo = $2", [tittle, epTittle_id])
    if (check_register.rows.length === 0) console.log("O episódio ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O episódio já está cadastrado no sitema...")
    }

    // Adicionando episódio
    if (hasEpisodes == false) {
      await database.query("INSERT INTO dataflix.episodio VALUES ($1, $2, $3, $4, $5)", [episode_id, epTittle_id, tittle, synopsis, season])
      console.log("O episódio foi cadastrado com sucesso...")
    }
    else if (hasEpisodes == true && isRegistred == false) {
      await database.query("INSERT INTO dataflix.episodio VALUES ($1, $2, $3, $4, $5)", [episode_id, epTittle_id, tittle, synopsis, season])
      console.log("O episódio foi cadastrado com sucesso...")
    }
    else if (hasEpisodes == true && isRegistred == true) console.log("Não é possível cadastrar este episódio...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getEpisode(epNum, epSeason) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de episódio já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.episodio WHERE numero = $1 AND temporada = $2", [epNum, epSeason])
    if (check_register.rows.length === 0) console.log("O episódio não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O episódio já está cadastrado no sitema...")
    }

    if (isRegistred == true) {
      let get_episode = await database.query("SELECT * FROM dataflix.episodio WHERE numero = $1 AND temporada = $2",[epNum, epSeason])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_episode.rows)

      // Coletando os campos 
      let episode_rows = []
      episode_rows.push(get_episode.rows)
      let episode_data = []
      episode_data.push(episode_rows[0])

      // Retornando os dados
      let episode = episode_data[0]
      console.log("Retornando o episódio...")
      console.log(episode)
      db_episode = episode
    }
    else if (isRegistred == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getEpisodes(TittleRef, Season) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificando episódios
    let haveEpisodes = false
    let check_episodes = await database.query("SELECT * FROM dataflix.episodio WHERE idtitulo = $1 AND temporada = $2", [TittleRef, Season])
    if (check_episodes.rows.length === 0) console.log("Não existem episódios cadastrados para esse título e temporada...")
    else {
      haveEpisodes = true
      console.log("Exite pelo menos um episódio cadastrado para esse título e temporada...")
    }

    // Buscando episódios
    if (haveEpisodes == true) {
      let get_episodes = await database.query("SELECT * FROM dataflix.episodio WHERE idtitulo = $1 AND temporada = $2", [TittleRef, Season])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_episodes.rows)

      // Coletando os campos
      let episodes_rows = []
      episodes_rows.push(get_episodes.rows)
      let episodes_data = []
      episodes_data.push(episodes_rows[0])

      // Retornando os dados
      let episodes = episodes_data[0]
      console.log("Retornando a lista de episódios...")
      console.log(episodes)
      db_episodes = episodes
    }
    else if (haveEpisodes == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setEpisode(epNum, epSeason) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let new_tittle_txt = "Ep 01 - Pilot"
    let new_synopsis = "A new world"

    // Verificação de episódio já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.episodio WHERE numero = $1 AND temporada = $2", [epNum, epSeason])
    if (check_register.rows.length === 0) console.log("O episódio ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O episódio já está cadastrado no sitema...")
    }

    // Editar episódio
    if (isRegistred == true) {
      await database.query("UPDATE dataflix.episodio SET titulo = $1, sinopse = $2", [new_tittle_txt, new_synopsis])
      console.log("O episódio foi atualizado com sucesso...")
    }
    else if (isRegistred == false) console.log("Não foi possível atualizar o episódio...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeEpisode(epTittle_txt) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de episódio já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.episodio WHERE titulo = $1", [epTittle_txt])
    if (check_register.rows.length === 0) console.log("O episódio ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O episódio já está cadastrado no sitema...")
    }

    // Removendo o episódio
    if (isRegistred == true) {
      await database.query("DELETE FROM dataflix.episodio WHERE titulo = $1", [epTittle_txt])
      console.log("O episódio foi removido com sucesso...")
    }
    else if (isRegistred == false) console.log("Não foi possível remover o episódio...")
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
registerEpisode(4)
// getEpisode(1, 1)
// getEpisodes(3, 1)
// setEpisode(0, 1)
// removeEpisode("Ep 02")

