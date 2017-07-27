import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import appConfig from './config/config';
import path from 'path';
import logger from 'morgan';
import Log from 'log';
import favicon from 'serve-favicon';

import items from './routes/items.routes';
import categorias from './routes/categories.routes';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;
const log = new Log('debug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger(appConfig.log_level));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const indexPath = path.join(__dirname, 'public');
app.use(express.static(indexPath));

app.use('/api/items', items);
app.use('/api/categorias', categorias);

app.get('/*', (req, res) => {
	res.sendFile(indexPath  + '/index.html');
});

server.listen(port, () => {
  log.info(`Servidor iniciado en puerto ${port}`)
});
