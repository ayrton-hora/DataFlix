const {Client} = require('pg')
const client = new Client({
  user: "temp_user",
  password: "dataflixtempuser",
  host: "ayrtonhora-database1ufs.c1nw3oxidazm.us-east-1.rds.amazonaws.com",
  port: 5432,
  database: "banco_de_dados_2020.2",
})

module.exports = client