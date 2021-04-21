"use strict";
const cors = require('cors');
const bodyParser = require('body-parser');
const { Router } = require('express');
const { partialRight } = require('ramda');
const controller = require('./utils/create_controller');
module.exports = ({ config, logger, database }) => {
    const router = Router();
    if (config.env === 'development') {
    }
    if (config.env !== 'test') {
    }
    router
        .use(cors({
        origin: [
            'http://localhost:8080'
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }))
        .use(bodyParser.json());
    router.use('/', controller('index'));
    router.use(`/api/posts`, controller('post').router);
    return router;
};
//# sourceMappingURL=router.js.map