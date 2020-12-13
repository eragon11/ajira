
//include all the packages necessary
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from 'morgan';
import http from 'http';

//include the files 
import { connect } from "./config/database.config";
import logger from './config/logger';
import apiRouters from './router';

//Logger Configuration
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};

//set the port
const port = 8282;

const app = express();

const server = http.createServer(app)

connect()

app.use(cors());
app.use(bodyParser.json({ extended: true, limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(morgan("dev", { "stream": logger.stream }));

//healthcheck 
app.get('/api/health_check', function (req, res, next) {
    res.sendStatus(200);
});

//include all the necessary routes in the express
app.use('/api', apiRouters);

server.listen(port, () => {
    logger.info(`Server started on port : ${port}`);
});