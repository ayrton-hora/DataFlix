const database = require('./database')
let acc_devices;

async function deviceNumber() {
  try {
    let search_devices = await database.query("SELECT * FROM dataflix.dispositivos")
    if (search_devices.rows.length === 0) return 0
    else return search_devices.rowCount
  }
  catch (e) {
    console.log(`${e}`)
  }
}

async function registerDevice(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados
    let device_id = await deviceNumber()
    let ip = "192.0.2.2"
    let now_date = new Date()
    let start_date = now_date.getFullYear()+'-'+(now_date.getMonth()+1)+'-'+now_date.getDate() 
    let final_date = "2021-12-30"
    let status = "ativo"

    // Verificação dos dispositivos
    let hasDevices = false
    let check_device = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1", [acc_id])
    if (check_device.rows.length === 0) console.log("A conta ainda não possui nenhum dispositivo cadastrado...")
    else {
      hasDevices = true
      console.log("A conta possui pelo menos um dispositivo cadastrado...")
    }

    // Verificação de dispositivo já associado
    let isAssociated = false
    let check_association = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1 AND ip = $2", [acc_id, ip])
    if (check_association.rows.length === 0) console.log("Este dispositivo não está associado a nenhuma conta...")
    else {
      isAssociated = true
      console.log("Este dispositivo já está associado a uma conta...")
    }

    // Adicionando o dispositivo
    if (hasDevices == false) {
      let new_device = await database.query("INSERT INTO dataflix.dispositivos VALUES ($1, $2, $3, $4, $5, $6)", [device_id, acc_id, ip, start_date, final_date, status])
      isAssociated = true
      console.log("Foi adicionado um dispositivo à conta...")
    }
    else if (hasDevices == true && isAssociated == false) {
      let new_device = await database.query("INSERT INTO dataflix.dispositivos VALUES ($1, $2, $3, $4, $5, $6)", [device_id, acc_id, ip, start_date, final_date, status])
      console.log("Foi adicionado um dispositivo à conta...")
    }
    else if (hasDevices == true && isAssociated == true) console.log("Não é possível cadastrar este dispositivo novamente...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function getDevices(acc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação dos dispositivos
    let hasDevices = false
    let check_device = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1", [acc_id])
    if (check_device.rows.length === 0) console.log("A conta ainda não possui nenhum dispositivo cadastrado...")
    else {
      hasDevices = true
      console.log("A conta possui pelo menos um dispositivo cadastrado...")
    }

    // Buscando dispositivos
    if (hasDevices == true) {
      let get_devices = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1", [acc_id])
      console.log("Consulta realizada com sucesso...")
      console.log("Tabela resultante: ")
      console.table(get_devices.rows)

      // Coletando os campos
      let devices_rows = []
      devices_rows.push(get_devices.rows)
      let devices_data = []
      devices_data.push(devices_rows[0])

      // Retornando os dados
      let devices = devices_data[0]
      console.log("Retornando dados dos dispositivos...")
      acc_devices = devices.toString
    }
    else if (hasDevices == false) console.log("Não foi possível efetuar a busca...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function setDevice(acc_id, dvc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Dados 
    let ip = "192.0.2.22"
    let now_date = new Date()
    let start_date = now_date.getFullYear()+'-'+(now_date.getMonth()+1)+'-'+now_date.getDate() 
    let final_date = "2021-12-30"
    let status = "ativo"

    // Verificação do dispositivo
    let hasDevice = false
    let check_device = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1 AND iddispositivo = $2", [acc_id, dvc_id])
    if (check_device.rows.length === 0) console.log("O dispositivo não foi encontrado...")
    else {
      hasDevice = true
      console.log("O dispositivo foi encontrado...")
    }

    // Editar dispotivo
    if (hasDevice == true) {
      await database.query("UPDATE dataflix.dispositivos SET ip = $1, data_fim = $2, status = $3 WHERE idconta = $4 AND iddispositivo = $5", [ip, final_date, status, acc_id, dvc_id])
      console.log("Dispositivo atualizado com sucesso...")
    }
    else if (hasDevice == false) console.log("Não foi possível atualizar o dispositivo...")
  }
  catch (e) {
    console.log(`${e}`)
  }
  finally {
    await database.end()
    console.log("Conexão encerrada com o Banco de Dados...")
  }
}

async function removeDevice(acc_id, dvc_id) {
  try {
    // Conexão
    await database.connect()
    console.log("Conexão estabelecida com o Banco de Dados...")

    // Verificação do dispositivo
    let hasDevice = false
    let check_device = await database.query("SELECT * FROM dataflix.dispositivos WHERE idconta = $1 AND iddispositivo = $2", [acc_id, dvc_id])
    if (check_device.rows.length === 0) console.log("O dispositivo não foi encontrado...")
    else {
      hasDevice = true
      console.log("O dispositivo foi encontrado...")
    }

    // Removendo dispositivo
    if (hasDevice == true) {
      await database.query("DELETE FROM dataflix.dispositivos WHERE idconta = $1 AND iddispositivo = $2", [acc_id, dvc_id])
      console.log("O dispositivo foi removido com sucesso...")
    }
    else if (hasDevice == false) console.log("Não foi possível remover o dispositivo...")
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
// registerDevice(0)
// getDevices(0)
// setDevice(0, 1)
// removeDevice(0, 0)