import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Log from 'log';
import appConfig from './config/config';
import path from 'path';

import items from './routes/items.routes';
import categorias from './routes/categories.routes';

/*var index = require('./routes/index');
var users = require('./routes/users');*/

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3002;
const log = new Log(appConfig.log_level);

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

/*app.use('/', index);
app.use('/users', users);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

server.listen(port, () => {
	console.log(__dirname);
  log.info(`Servidor iniciado en ${port}`);
});
