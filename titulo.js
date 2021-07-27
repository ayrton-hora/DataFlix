const database = require('./database') 
let db_movies;
let db_series;

async function tittleNumber() {
  try {
    let search_title = await database.query("SELECT * FROM dataflix.titulo")
    if (search_title.rows.length === 0) return 0
    else return search_title.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function genderNumber() {
  try {
    let search_gender = await database.query("SELECT * FROM dataflix.genero")
    if (search_gender.rows.length === 0) return 0
    else return search_gender.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerTittle(movie=false, release_date=null, end_y=null , gender=false, gender_txt="") {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let tittle_id = await tittleNumber()
    let gender_id = await genderNumber()
    let tittle_txt = "Soul"
    let synopsis = "(IMDB) - After landing the gig of a lifetime, a New York jazz pianist suddenly finds himself trapped in a strange land between Earth and the afterlife."
    let year = 2020
    // let tittle_txt = "Wandavision"
    // let synopsis = "(IMDB) - Blends the style of classic sitcoms with the MCU, in which Wanda Maximoff and Vision - two super-powered beings living their ideal suburban lives - begin to suspect that everything is not as it seems."
    // let year = 2021

    // Verificação dos títulos
    let hasTittles = false
    let check_tittles = await database.query("SELECT * FROM dataflix.titulo")
    if (check_tittles.rows.length === 0) console.log("Não existem títulos cadastrados...")
    else {
      hasTittles = true
      console.log("Existe pelo menos um título cadastrado no sistema...")
    }

    // Verificação de título já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.titulo WHERE titulo = $1", [tittle_txt])
    if (check_register.rows.length === 0) console.log("O título ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O título já está cadastrado no sistema...")
    }

    // Adicionando o título
    // Nenhum título cadastrado no sistema
    if (hasTittles == false) {
      // Cadastra um título e cadastra ou não um gênero para aquele título
      if (gender == true) {
        await database.query("BEGIN")
        await database.query("INSERT INTO dataflix.titulo VALUES ($1, $2, $3, $4)", [tittle_id, tittle_txt, synopsis, year])
        await database.query("INSERT INTO dataflix.genero VALUES ($1, $2)", [gender_id, gender_txt])
        await database.query("INSERT INTO dataflix.possui VALUES ($1, $2)", [tittle_id, gender_id])
        await database.query("COMMIT")
        console.log("Um título com gênero definido foi cadastrado no sistema...")
        // Cadastro de filme
        if (movie == true) {
          await database.query("INSERT INTO dataflix.filme VALUES ($1, $2)", [tittle_id, release_date])
          console.log("Um filme foi cadastrado no sistema...")
        }
        // Cadastro de série
        else if (movie == false) {
          await database.query("INSERT INTO dataflix.serie VALUES ($1, $2)", [tittle_id, end_y])
          console.log("Uma série foi cadastrada no sistema...")
        }
      }
      else if (gender == false) {
        await database.query("INSERT INTO dataflix.titulo VALUES ($1, $2, $3, $4)", [tittle_id, tittle_txt, synopsis, year])
        console.log("Um título sem gênero definido foi cadastrado no sistema...")
        // Cadastro de filme
        if (movie == true) {
          await database.query("INSERT INTO dataflix.filme VALUES ($1, $2)", [tittle_id, release_date])
          console.log("Um filme foi cadastrado no sistema...")
        }
        // Cadastro de série
        else if (movie == false) {
          await database.query("INSERT INTO dataflix.serie VALUES ($1, $2)", [tittle_id, end_y])
          console.log("Uma série foi cadastrada no sistema...")
        }
      }
    }
    // Possui pelo menos um título cadastrado no sistema, porém não o em questão a ser processado
    else if (hasTittles == true && isRegistred == false) {
      // Cadastra um título e cadastra ou não um gênero para aquele título
      if (gender == true) {
        await database.query("BEGIN")
        await database.query("INSERT INTO dataflix.titulo VALUES ($1, $2, $3, $4)", [tittle_id, tittle_txt, synopsis, year])
        await database.query("INSERT INTO dataflix.genero VALUES ($1, $2)", [gender_id, gender_txt])
        await database.query("INSERT INTO dataflix.possui VALUES ($1, $2)", [tittle_id, gender_id])
        await database.query("COMMIT")
        console.log("Um título com gênero definido foi cadastrado no sistema...")
        // Cadastro de filme
        if (movie == true) {
          await database.query("INSERT INTO dataflix.filme VALUES ($1, $2)", [tittle_id, release_date])
          console.log("Um filme foi cadastrado no sistema...")
        }
        // Cadastro de série
        else if (movie == false) {
          await database.query("INSERT INTO dataflix.serie VALUES ($1, $2)", [tittle_id, end_y])
          console.log("Uma série foi cadastrada no sistema...")
        }
      }
      else if (gender == false) {
        await database.query("INSERT INTO dataflix.titulo VALUES ($1, $2, $3, $4)", [tittle_id, tittle_txt, synopsis, year])
        console.log("Um título sem gênero definido foi cadastrado no sistema...")
        // Cadastro de filme
        if (movie == true) {
          await database.query("INSERT INTO dataflix.filme VALUES ($1, $2)", [tittle_id, release_date])
          console.log("Um filme foi cadastrado no sistema...")
        }
        // Cadastro de série
        else if (movie == false) {
          await database.query("INSERT INTO dataflix.serie VALUES ($1, $2)", [tittle_id, end_y])
          console.log("Uma série foi cadastrada no sistema...")
        }
      }
    }
    // Possui pelo menos um título cadastrado no sistema, porém o em questão já foi processado anteriormente
    else if (hasTittles == true && isRegistred == true) console.log("Não foi possível cadastrar este título...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getMovies() {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação dos filmes
    let haveMovies = false
    let check_movies = await database.query("SELECT * FROM dataflix.titulo")
    if (check_movies.rows.length === 0) console.log("Não existem filmes cadastrados...")
    else {
      haveMovies = true
      console.log("Existe pelo menos um filme cadastrado...")
    }
    
    // Buscando filmes
    if (haveMovies == true) {
      let get_movies = await database.query("SELECT * FROM dataflix.titulo t JOIN dataflix.filme f USING(idtitulo)")
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_movies.rows)

      // Coletando os campos
      let movies_rows = []
      movies_rows.push(get_movies.rows)
      let movies_data = []
      movies_data.push(movies_rows[0])

      // Retornando os dados
      let movies = movies_data[0]
      console.log("Retornando os dados dos filmes...")
      db_movies = movies
      console.log(movies)
    }
    else if (haveMovies == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getSeries() {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação das series
    let haveSeries = false
    let check_series = await database.query("SELECT * FROM dataflix.serie")
    if (check_series.rows.length === 0) console.log("Não existem séries cadastradas...")
    else {
      haveSeries = true
      console.log("Existe pelo menos uma série cadastrada...")
    }

    // Buscando séries
    if (haveSeries == true) {
      let get_series = await database.query("SELECT * FROM dataflix.titulo t JOIN dataflix.serie s USING(idtitulo)")
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_series.rows)

      // Coletando os campos
      let series_rows = []
      series_rows.push(get_series.rows)
      let series_data = []
      series_data.push(series_rows[0])

      // Retornando os dados
      let series = series_data[0]
      console.log("Retornando os dados das séries...")
      db_series = series
    }
    else if (haveSeries == false) console.log("Não foi possível efetuar a busca...")

  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setTittle(movie=false, tit_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let new_tittle = "Eu, Coringa"
    let new_synopsis = "Mais maldades"
    let new_year = 2022
    let new_releasedate = "2021-01-28"
    let new_endYear = 2022

    // Verificando título
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.titulo WHERE idtitulo = $1", [tit_id])
    if (check_register.rows.length === 0) console.log("O título ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O título já está cadastrado no sistema...")
    }

    // Editando título
    if (isRegistred == true) {
      if (movie == true) {
        await database.query("BEGIN")
        await database.query("UPDATE dataflix.titulo SET titulo = $1, sinopse = $2, ano = $3 WHERE idtitulo = $4", [new_tittle, new_synopsis, new_year, tit_id])
        await database.query("UPDATE dataflix.filme SET data_lancamento = $1 WHERE idtitulo = $2", [new_releasedate, tit_id])
        await database.query("COMMIT")
        console.log("O filme foi atualizado com sucesso...")
      }
      else if (movie == false) {
        await database.query("BEGIN")
        await database.query("UPDATE dataflix.titulo SET titulo = $1, sinopse = $2, ano = $3 WHERE idtitulo = $4", [new_tittle, new_synopsis, new_year, tit_id])
        await database.query("UPDATE dataflix.serie SET ano_fim = $1 WHERE idtitulo = $2", [new_endYear, tit_id])
        await database.query("COMMIT")
        console.log("A série foi atualizada com sucesso...")
      }
    }
    else if (isRegistred == false) console.log("Não foi possível atualizar o título...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }

}

async function setGender(gen_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let new_gender = "Família"

    // Verificação de gênero
    let isRegistred = false
    let check_gender = await database.query("SELECT * FROM dataflix.genero WHERE idgenero = $1", [gen_id])
    if (check_gender.rows.length === 0) console.log("O gênero não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O gênero está cadastrado no sistema...")
    }

    // Editando gênero
    if (isRegistred == true) {
      await database.query("UPDATE dataflix.genero SET genero = $1 WHERE idgenero = $2", [new_gender, gen_id])
      console.log("O gênero foi atualizado com sucesso...")
    }
    else if (isRegistred == false) console.log("Não foi possível atualizar o gênero...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeTittle(gender=false, gen_id, tit_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação de título já cadastrado
    let isRegistred = false
    let check_register = await database.query("SELECT * FROM dataflix.titulo WHERE idtitulo = $1", [tit_id])
    if (check_register.rows.length === 0) console.log("O título ainda não está cadastrado no sistema...")
    else {
      isRegistred = true
      console.log("O título está cadastrado no sistema...")
    }

    // Removendo título
    if (isRegistred == true) {
      if (gender == true) {
        await database.query("BEGIN")
        await database.query("DELETE FROM dataflix.titulo WHERE idtitulo = $1", [tit_id])
        await database.query("DELETE FROM dataflix.genero WHERE idgenero = $1", [gen_id])
        await database.query("COMMIT")
        console.log("Um título com gênero foi removido com sucesso...")
      }
      else if (gender == false) {
        await database.query("DELETE FROM dataflix.titulo WHERE idtitulo = $1", [tit_id])
        console.log("Um título sem gênero foi removido com sucesso...")
      }
    }
    else if (isRegistred == false) console.log("Não foi possível remover o título")
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
// registerTittle(true, "2020-12-25", null, true, "Infantil e Comédia")
// registerTittle(false, "2016-07-15", "2021", false, "")
// removeTittle(false, 0, 0)
// getMovies()
// getSeries()
// setTittle(true, 0)
// setGender(0)