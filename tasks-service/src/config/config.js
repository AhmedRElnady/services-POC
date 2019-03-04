const serverSettings = {
    port: process.env.PORT || 4000
}

const dbSettings = {
    database: 'mongodb://localhost:27017/sptasks'
}



module.exports = Object.assign({}, { serverSettings, dbSettings});