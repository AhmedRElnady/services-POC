const serverSettings = {
    port: process.env.PORT || 3000
}

const dbSettings = {
    database: 'mongodb://localhost:27017/user_db'
}



module.exports = Object.assign({}, { serverSettings, dbSettings});
