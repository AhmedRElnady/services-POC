const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const _api = require('../api/tasks');

const start = (container) => {
    return new Promise((resolve, reject) => {

        const {port} = container.resolve('serverSettings');
        const repo = container.resolve('repo');

        if (!repo) {
            reject(new Error('The server must be started with a connected repository'));
        }
        if (!port) {
            reject(new Error('The server must be started with a port'));
        }
        
        const app = express();

        app.use(bodyParser.json());
        app.use(cors());
        app.use(helmet());

        app.use((err, req, res, next) => {
            reject(new Error(`Something went worong!, err: ${err}`));
            res.status(500).send('Something went worong!');
            next();
        });

        const api = _api.bind(null, {repo});
        api(app);

        const server = app.listen(port, ()=> resolve(server));
    });
}// end start function 

module.exports = Object.assign({}, {start});