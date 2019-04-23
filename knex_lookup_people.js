const settings = require("./settings");

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

const personName = process.argv[2];

knex.select('*').from('famous_people')
    .where('first_name', personName)
    .orWhere('last_name', personName)
    .asCallback(function(err, result) {
      if (err) return console.error(err);
      console.log("Searching ...");
      console.log(`Found ${result.length} person(s) by the name '${personName}'`)
      for (i = 0; i < result.length; i++) {
        console.log(`- ${i + 1}: ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate}'`);
      }
    })
    .finally(function() {
      knex.destroy();
    });