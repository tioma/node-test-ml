'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _log = require('log');

var _log2 = _interopRequireDefault(_log);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _items = require('./routes/items.routes');

var _items2 = _interopRequireDefault(_items);

var _categories = require('./routes/categories.routes');

var _categories2 = _interopRequireDefault(_categories);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
var port = process.env.PORT || 3002;
var log = new _log2.default('debug');

app.use((0, _serveFavicon2.default)(_path2.default.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)(_config2.default.log_level));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

var indexPath = _path2.default.join(__dirname, 'public');
app.use(_express2.default.static(indexPath));

app.use('/api/items', _items2.default);
app.use('/api/categorias', _categories2.default);

app.get('/*', function (req, res) {
  res.sendFile(indexPath + '/index.html');
});

server.listen(port, function () {
  log.info('Servidor iniciado en puerto ' + port);
});