const express = require('express');
const helmet = require('helmet');

const zooRouter = require('../zoo/zoo-router.js');
const bearRouter = require('../bears/bear-router.js')

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', zooRouter);
server.use('/api/zoos/bears', bearRouter);

module.exports = server;