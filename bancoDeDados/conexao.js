var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : 'gabriel',
      database : 'knexjs_faculdade'
    }
  });

module.exports = knex